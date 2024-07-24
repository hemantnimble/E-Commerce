import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('Request body:', body); // Log request body
        const { id } = body; // Extract `id` from the body
        const deleteUser = await prisma.user.delete({
            where: { id },
        });
        return NextResponse.json(deleteUser, { status: 200 });
    } catch (err: any) {
        console.error('Error:', err.message); // Log the error
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
