import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import Collapsible from '../../../components/collapsible/collapsible';
import ExercisesList from '../../../components/exercises/list';
import HeadPage from '../../../components/layout/head-page';
import Spinner from '../../../components/spinner/spinner';
import fetcher from '../../../helpers/fetcher';

interface MyExercisesProps {}

const MyExercises: NextPage<MyExercisesProps> = () => {
    const { data, error } = useSWR<Exercise[]>(`/api/user/exercises`, fetcher);

    const { data: session } = useSession();
    useEffect(() => {
        if (!session) {
            Router.push('/signin');
        }
    }, [session]);

    if (error) return <span>{error}</span>;
    if (!data) return <Spinner />;

    const getTargetMuscle: string[] = [
        ...new Set(
            data.map((data) => data.target).sort((a, b) => a.localeCompare(b))
        ),
    ];

    const myExercisesByTarget = (targetMuscle: string) => {
        return data.filter((exercise) => exercise.target === targetMuscle);
    };

    return (
        <div>
            <HeadPage title="Exercises - My Exercises" />
            <section className="m-5 divide-y-2 divide-dark-700">
                <h1 className="capitalize font-bold text-2xl text-neutral-200 my-5">
                    My exercises
                </h1>
                <div className="pt-5">
                    {data.length === 0 && "You don't have any exercises yet."}
                    {data &&
                        getTargetMuscle.map((muscle) => (
                            <div key={muscle}>
                                <Collapsible key={muscle} targetMuscle={muscle}>
                                    <ExercisesList
                                        data={myExercisesByTarget(muscle)}
                                    />
                                </Collapsible>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default MyExercises;
