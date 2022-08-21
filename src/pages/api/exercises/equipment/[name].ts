import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { name } = req.query;

    const exercisesByEquipment = await prisma.exercise.findMany({
        where: {
            equipment: `${name}`,
        },
    });

    res.status(200).json(exercisesByEquipment);
}
