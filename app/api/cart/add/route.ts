import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    const session = await auth();
    const userId = session?.user?.id;

    // Return an error response if userId is not defined
    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    try {
        const adCart = await prisma.cartItem.upsert({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
            update: {
                quantity: {
                    increment: quantity,
                },
            },
            create: {
                userId,
                productId,
                quantity,
            },
        });
        return NextResponse.json({ adCart }, { status: 200 });

    } catch (err:any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
