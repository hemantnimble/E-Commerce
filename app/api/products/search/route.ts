import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const query = url.searchParams.get('query');
    
    if (!query || typeof query !== "string") {
        return NextResponse.json({ message: "Query parameter is required" }, { status: 400 });
    }

    try {
        // Fetch products that match the search query
        const products = await prisma.products.findMany({
            where: {
                title: {
                    contains: query,
                    mode: "insensitive",
                },
            },
        });

        return NextResponse.json({ products }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: (err as Error).message }, { status: 500 });
    }
}