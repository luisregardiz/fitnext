import { UserExercises } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import { HiCheck, HiPlus, HiX } from 'react-icons/hi';
import useSWR from 'swr';
import fetcher from '../../helpers/fetcher';
import {
    addUserExercise,
    removeUserExercise,
} from '../../services/user/exercises';

interface AddExerciseProps {
    exercise: Exercise;
    className?: string;
}

const AddExercise: FC<AddExerciseProps> = ({ exercise, className }) => {
    const [isAdded, setAdded] = useState(false);
    const { data: userExercises } = useSWR<UserExercises[]>(
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
        <div className={className}>
            {isAdded ? (
                <button
                    onClick={(e) =>
                        removeUserExercise(e, findUserExercise(exercise.id)!)
                    }
                    className="flex items-center border-2 border-red-600 p-2 rounded-lg space-x-2 text-sm bg-red-600 text-neutral-100 font-semibold hover:opacity-80"
                >
                    <HiX className="text-lg" />
                </button>
            ) : (
                <button
                    onClick={(e) => addUserExercise(e, exercise.id)}
                    className="flex items-center border-2 p-2 rounded-lg space-x-2 text-sm border-cyan-500 text-cyan-500 font-semibold "
                >
                    <HiPlus className="text-lg" />
                </button>
            )}
        </div>
    );
};

export default AddExercise;
