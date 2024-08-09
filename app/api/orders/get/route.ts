import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    try {
        const orders = await prisma.order.findMany({
            where: { userId: userId as string },
            include: {
                items: {
                    include: {
                        product: true, // Include product details
                    },
                },
            },
            orderBy: {
                createdAt: 'desc', // Order by creation date
            },
        });

        return NextResponse.json({orders }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: err }, { status: 500 });

    }
}