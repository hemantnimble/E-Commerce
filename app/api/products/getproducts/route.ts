import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(res: NextResponse) {
    try {
        const products = await prisma?.products.findMany()
        return NextResponse.json({
            products
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}