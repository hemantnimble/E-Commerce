import { NextResponse } from "next/server";

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