import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        const { id } = req.query as { id: string };

        const result = await prisma.weights.delete({
            where: {
                id,
            },
        });
        res.status(200).json(result);
    }
}
