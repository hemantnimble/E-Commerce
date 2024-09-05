import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    const { id, title, price, images }: { id: string, title: string, price: number, images: string[] } = await req.json();

    try {
        const updatedProduct = await prisma.products.update({
            where: {
                id: id,
            },
            data: {
                title,
                price,
                images,  
            },
        });
        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
