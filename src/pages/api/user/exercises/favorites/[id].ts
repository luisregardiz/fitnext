import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const result = await prisma.userExercises.delete({
        where: {
            id: id as string,
        },
    });
    res.status(200).json(result);
}
