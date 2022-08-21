import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    const result = await prisma.weights.findMany({
        where: {
            user: {
                email: session?.user?.email!,
            },
        },
    });
    const getCurrentlyWeight = result?.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    const getMinWeight = result?.sort((a, b) => a.weight - b.weight)[0];
    const getMaxWeight = result?.sort((a, b) => b.weight - a.weight)[0];
    const weightStats = [
        {
            name: 'Currently Weight',
            weight: getCurrentlyWeight?.weight,
            date: getCurrentlyWeight?.date,
        },
        {
            name: 'Min Weight',
            weight: getMinWeight?.weight,
            date: getMinWeight?.date,
        },
        {
            name: 'Max Weight',
            weight: getMaxWeight?.weight,
            date: getMaxWeight?.date,
        },
    ];
    res.status(200).json(weightStats);
}
