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
                        product: true,
                          
                    },
                },
                address: true,
            },
            orderBy: {
                createdAt: 'desc', 
            },
        });

        return NextResponse.json({orders }, { status: 200 });
    } catch (err: any) {
        console.error("Error fetching orders:", err);
        return NextResponse.json({ message: err }, { status: 500 });

    }
}