import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
    const session = await auth();
    const userId = session?.user?.id;
    try {
        if (!userId) {
            return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
          }
          const { productId } = await req.json();

          const reviews = await prisma.review.findMany({
            where: { productId: String(productId) },
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          });
      
          return NextResponse.json({ reviews });
      
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
