import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ExercisesList from '../../../components/exercises/list';
import HeadPage from '../../../components/layout/head-page';
import Spinner from '../../../components/spinner/spinner';
import { equipments } from '../../../helpers/exercises-sidebar';
import fetcher from '../../../helpers/fetcher';

interface MuscleProps {}

const Muscle: NextPage<MuscleProps> = () => {
    const router = useRouter();

    const [equipmentSelected, setEquipmentSelected] = useState('');
    const { data: session } = useSession();
    useEffect(() => {
        if (!session) {
            Router.push('/signin');
        }
    }, [session]);

    const { name } = router.query;

    const { data, error } = useSWR<Exercise[]>(
        `/api/exercises/muscle/${name}`,
        fetcher
    );
    const filterData = () => {
        if (!equipmentSelected) return data;
        return data?.filter((exercise) =>
            exercise.equipment.includes(equipmentSelected.toLowerCase())
        );
    };

    if (error) return <span>{error}</span>;
    if (!data) return <Spinner />;

    return (
        <div>
            <HeadPage title={`Exercises - Muscle ${name}`} />
            <section className="m-5 divide-y-2 divide-dark-700">
                <h1 className="capitalize font-bold text-2xl my-5 text-neutral-200">
                    Muscle: <span className="text-cyan-500">{name}</span>
                </h1>
                <div className="pt-5">
                    <div className="mb-5 flex items-center space-x-5">
                        <span>Filter by:</span>
                        <select
                            name="equipment"
                            id="equipment"
                            onChange={(e) =>
                                setEquipmentSelected(e.target.value)
                            }
                            value={equipmentSelected}
                            className="bg-dark-700 p-2 rounded-lg"
                        >
                            <option value="">All Equipment</option>
                            {equipments.map((equipment) => (
                                <option key={equipment} value={equipment}>
                                    {equipment}
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

export default Muscle;
