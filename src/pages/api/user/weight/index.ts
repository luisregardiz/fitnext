import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    if (req.method === 'POST') {
        const { weight, date } = req.body as Weight;

        const result = await prisma.weights.create({
            data: {
                weight,
                date,
                user: {
                    connect: {
                        email: session?.user?.email!,
                    },
                },
            },
        });
        res.status(201).json(result);
    }
    if (req.method === 'GET') {
        const result = await prisma.weights.findMany({
            orderBy: {
                createdAt: 'asc',
            },
            where: {
                user: {
                    email: session?.user?.email!,
                },
            },
        });
        res.status(200).json(result);
    }
}
