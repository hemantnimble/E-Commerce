import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await auth()
  const userId = session?.user?.id
  const { productId, quantity } = await req.json();


  try {
    const adCart = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        userId,
        productId,
        quantity,
      },
    })
    return NextResponse.json({ adCart }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }

}