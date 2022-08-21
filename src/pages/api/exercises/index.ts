import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { page } = req.query;

    const exercises = await prisma.exercise.findMany();
    const perPage = 150;
    const totalPosts = exercises.length;
    const totalPages = (totalPosts / perPage).toFixed(0);
    const start = (Number(page) - 1) * perPage;
    let end = start + perPage;
    if (end > totalPosts) {
        end = totalPosts;
    }
    res.status(200).json({
        currentPage: page,
        perPage: perPage,
        totalCount: totalPosts,
        pageCount: totalPages,
        start: start,
        end: end,
        exercises: exercises.slice(start, end),
    });
}
