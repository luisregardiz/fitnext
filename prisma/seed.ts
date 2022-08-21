import { Exercise, PrismaClient } from '@prisma/client';
import axios from 'axios';
const prisma = new PrismaClient();

let exercises: Exercise[] = [];
const getExercises = async () => {
    const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises',
        headers: {
            'X-RapidAPI-Key':
                '61e6e27da0msh45c2ba16e68090fp19a515jsn05737cbd4208',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
    };
    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        throw new Error('error creating many exercises');
    }
};

getExercises().then((data) => {
    exercises = data;
    main();
});

async function main() {
    await prisma.exercise.createMany({
        data: exercises,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
