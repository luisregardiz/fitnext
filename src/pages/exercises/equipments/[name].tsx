import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ExercisesList from '../../../components/exercises/list';
import HeadPage from '../../../components/layout/head-page';
import Spinner from '../../../components/spinner/spinner';
import { muscles } from '../../../helpers/exercises-sidebar';
import fetcher from '../../../helpers/fetcher';

interface EquipmentProps {}

const Equipment: NextPage<EquipmentProps> = () => {
    const router = useRouter();

    const [muscleSelected, setMuscleSelected] = useState('');
    const { data: session } = useSession();
    useEffect(() => {
        if (!session) {
            Router.push('/signin');
        }
    }, [session]);

    const { name } = router.query;
    const { data, error } = useSWR<Exercise[]>(
        `/api/exercises/equipment/${name}`,
        fetcher
    );

    const filterData = () => {
        if (!muscleSelected) return data;
        return data?.filter((exercise) =>
            exercise.target.includes(muscleSelected.toLowerCase())
        );
    };
    if (error) return <span>{error}</span>;
    if (!data) return <Spinner />;

    return (
        <div>
            <HeadPage title={`Exercises - Equipment ${name}`} />
            <section className="m-5 divide-y-2 divide-dark-700">
                <h1 className="capitalize font-bold text-2xl my-5 text-neutral-200">
                    Equipment: <span className="text-cyan-500">{name}</span>
                </h1>
                <div className="pt-5">
                    <div className="mb-5 flex items-center space-x-5">
                        <span>Filter by:</span>
                        <select
                            name="muscles"
                            id="muscles"
                            onChange={(e) => setMuscleSelected(e.target.value)}
                            value={muscleSelected}
                            className="bg-dark-700 p-2 rounded-lg"
                        >
                            <option value="">All Muscle</option>
                            {muscles.map((muscle) => (
                                <option key={muscle} value={muscle}>
                                    {muscle}
                                </option>
                            ))}
                        </select>
                    </div>
                    {data && <ExercisesList data={filterData()!} />}
                </div>
            </section>
        </div>
    );
};

export default Equipment;
