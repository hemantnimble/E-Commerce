import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { paymentIntentId, cartItems, selectedAddress } = await req.json();
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
                addressId: selectedAddress,
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

        const orderedProductIds = cartItems.map((item: any) => item.productId);
        const deleteResult = await prisma.cartItem.deleteMany({
            where: {
                userId: userId,
                productId: {
                    in: orderedProductIds,
                },
            },
        });
        return NextResponse.json({ order }, { status: 200 });
    } catch (error: any) {
        console.log("Error during cart deletion:", error); // Log any errors
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
