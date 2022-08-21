import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';

import useSWR from 'swr';
import ExercisesList from '../../components/exercises/list';
import HeadPage from '../../components/layout/head-page';
import Pagination from '../../components/layout/pagination';
import Spinner from '../../components/spinner/spinner';
import fetcher from '../../helpers/fetcher';
import { usePagination } from '../../hooks/usePagination';

interface ExercisesProps {}

const Exercises: NextPage<ExercisesProps> = () => {
    const { currentPage, setCurrentPage } = usePagination();

    const { data: session } = useSession();
    useEffect(() => {
        if (!session) {
            Router.push('/signin');
        }
    }, [session]);

    const { data, error } = useSWR<ExerciseData>(
        `/api/exercises?page=${currentPage}`,
        fetcher
    );

    if (error) return <span>{error}</span>;
    if (!data) return <Spinner />;

    return (
        <div>
            <HeadPage title="Exercises" />
            <section className="m-5 divide-y-2 divide-dark-700">
                <h1 className="capitalize font-bold text-2xl text-neutral-200 my-5">
                    All exercises
                </h1>
                <div className="pt-5">
                    {data && <ExercisesList data={data.exercises} />}
                </div>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageCount={data.pageCount}
                />
            </section>
        </div>
    );
};

export default Exercises;
