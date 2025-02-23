import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    if (!session.user.roles.includes('ADMIN')) {
        return NextResponse.json({ message: "User not authorized" }, { status: 403 });
    }

    try {
        const orders = await prisma.orderItem.findMany({
            include: {
                order: {
                    include: {
                        user: {
                            select: {
                                name: true,  // Fetch only the name field
                            }
                        }
                    }
                },
                product: true,  // Include product details
            }
        });

        return NextResponse.json({ orders }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
