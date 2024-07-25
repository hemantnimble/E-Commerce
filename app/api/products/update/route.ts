import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, res: NextResponse) {
    const { id, title, price } = await req.json();

    try {
        const updatedProduct = await prisma.products.update({
            where: {
                id: id,
            },
            data: {
                title,
                price,
            },
        });
        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

};
