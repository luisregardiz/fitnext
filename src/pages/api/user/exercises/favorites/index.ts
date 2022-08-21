import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    const result = await prisma.userExercises.findMany({
        where: {
            user: {
                email: session?.user?.email!,
            },
        },
    });
    res.status(200).json(result);
}
