import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { HiCheck, HiPlus } from 'react-icons/hi';
import useSWR from 'swr';
import fetcher from '../../helpers/fetcher';
import {
    addUserExercise,
    removeUserExercise,
} from '../../services/user/exercises';
import AddExercise from './add-exercise';

interface ExerciseCardProps {
    exercise: Exercise;
}

interface UserExercise {
    exerciseId: string;
    id: string;
    userId: string;
}

const ExerciseCard: FC<ExerciseCardProps> = ({ exercise }) => {
    const router = useRouter();

    const [isAdded, setAdded] = useState(false);
    const { data: userExercises } = useSWR<UserExercise[]>(
        `/api/user/exercises/favorites`,
        fetcher
    );

    useEffect(() => {
        if (userExercises) {
            const isFavorite = userExercises.find(
                (userExercise) => userExercise.exerciseId === exercise.id
            );
            setAdded(!!isFavorite);
        }
    }, [exercise.id, userExercises]);

    const findUserExercise = (id: string) => {
        if (isAdded) {
            const userExerciseId = userExercises?.find(
                (userExercise) => userExercise.exerciseId === id
            )?.id;

            return userExerciseId;
        }
        return null;
    };

    return (
        <div
            onClick={() => router.push(`/exercises/exercise/${exercise.id}`)}
            className="flex flex-col items-start bg-dark-800 rounded-lg hover:shadow-lg hover:shadow-dark-700/50 cursor-pointer w-[250px]  h-[500px] relative"
        >
            <Image
                src={exercise.gifUrl}
                alt={exercise.name}
                height={250}
                width={250}
                objectFit="cover"
                className="rounded-t-lg"
            />
            <div className="flex flex-col items-start p-5">
                <span className="capitalize font-semibold text-neutral-300 text-sm">
                    {exercise.name}
                </span>
                <div className="text-dark-600 my-3 px-2 py-1 rounded-lg tracking-wide flex items-start absolute left-0 top-0">
                    <span className="uppercase font-semibold text-xs ">
                        {exercise.target}
                    </span>
                </div>
                <div className="bg-dark-600 w-full my-5 space-y-3 p-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <span className="text-neutral-300 text-sm">
                            Body part:
                        </span>
                        <span className="capitalize font-semibold ">
                            {exercise.bodyPart}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-neutral-300 text-sm">
                            Equipment:{' '}
                        </span>
                        <span className="capitalize font-semibold">
                            {exercise.equipment}
                        </span>
                    </div>
                </div>
                <AddExercise
                    exercise={exercise}
                    className="mt-5 absolute bottom-5 left-5"
                />
            </div>
        </div>
    );
};

export default ExerciseCard;
