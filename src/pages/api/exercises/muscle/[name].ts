import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { name } = req.query;

    const exercisesByMuscle = await prisma.exercise.findMany({
        where: {
            target: `${name}`,
        },
    });

    res.status(200).json(exercisesByMuscle);
}
