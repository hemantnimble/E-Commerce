import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";


const prisma = new PrismaClient();
export async function POST(req: NextRequest) {

    const { paymentIntentId, item ,quantity,selectedAddress} = await req.json();
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    try {
        const order = await prisma.order.create({
            data: {
                userId,
                paymentIntentId,
                addressId:selectedAddress,
                items: {
                    create: [
                        {
                            productId: item.id,
                            quantity: quantity,
                        },
                    ],
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
        console.log(error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

}
