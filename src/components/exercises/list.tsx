import { FC } from 'react';

import ExerciseCard from './card';

interface ExercisesListProps {
    data: Exercise[];
}

const ExercisesList: FC<ExercisesListProps> = ({ data }) => {
    return (
        <>
            {data.length === 0 && (
                <div className="flex items-center justify-center w-full">
                    <span className="italic text-lg text-neutral-300">
                        No exercises found
                    </span>
                </div>
            )}
            <div className="list-exercises ">
                {data.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
            </div>
        </>
    );
};

export default ExercisesList;
