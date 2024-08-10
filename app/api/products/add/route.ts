import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
    try {
        const { title, price, category, images } = await req.json();
        const result = await prisma.products.create({
            data: {
                title,
                price,
                category,
                images
            },
        });
        return NextResponse.json(result, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
