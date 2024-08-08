import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('Request body:', body); 
        const { id } = body; 
        const deleteUser = await prisma.products.delete({
            where: { id },
        });
        return NextResponse.json(deleteUser, { status: 200 });
    } catch (err: any) {
        console.error('Error:', err.message); 
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
