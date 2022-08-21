import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const session = await getSession({ req });

        const result = await prisma.user.findUnique({
            where: {
                email: session?.user?.email!,
            },
        });

        res.status(200).json(result);
    }

    if (req.method === 'PUT') {
        const session = await getSession({ req });

        const { name, weight, height, gender, birthdayDate } = req.body as User;

        const result = await prisma.user.update({
            where: {
                email: session?.user?.email!,
            },
            data: {
                name,
                weight,
                height,
                gender,
                birthdayDate,
            },
        });

        res.status(200).json(result);
    }
}
