import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { exerciseId } = req.body;

    const session = await getSession({ req });
    if (req.method === 'POST') {
        const result = await prisma.userExercises.create({
            data: {
                exercise: {
                    connect: {
                        id: exerciseId,
                    },
                },
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
        const myExercises = await prisma.exercise.findMany({
            where: {
                user: {
                    some: {
                        user: {
                            email: session?.user?.email,
                        },
                    },
                },
            },
        });

        res.status(200).json(myExercises);
    }
}
