import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    if (session.user.roles!=='ADMIN') {
        return NextResponse.json({ message: "User not autorized" }, { status: 401 });
    }
  

    try {
        const orders = await prisma.orderItem.findMany({
            include: {
                order: true,  
                product: true 
            }
        });

        return NextResponse.json({ orders }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
