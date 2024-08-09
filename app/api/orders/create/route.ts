import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";


const prisma = new PrismaClient();
export async function POST(req: NextRequest) {

    const { paymentIntentId, cartItems } = await req.json();
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    try {
        // Create the order
        const order = await prisma.order.create({
            data: {
                userId,
                paymentIntentId,
                items: {
                    create: cartItems.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        // Optionally: Clear the cart items if needed
        // await prisma.cartItem.deleteMany({
        //     where: {
        //         userId,
        //     },
        // });

        return NextResponse.json({ order }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

}
