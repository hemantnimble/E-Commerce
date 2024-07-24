import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PUT") {
        const { id, title, price } = req.body;

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
            res.status(200).json(updatedProduct);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
