import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import useSWR from 'swr';
import AddExercise from '../../../components/exercises/add-exercise';
import HeadPage from '../../../components/layout/head-page';
import Spinner from '../../../components/spinner/spinner';
import fetcher from '../../../helpers/fetcher';

interface ExerciseProps {}

const Exercise: NextPage<ExerciseProps> = () => {
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(() => {
        if (!session) {
            Router.push('/signin');
        }
    }, [session]);
    const { id } = router.query;

    const { data, error } = useSWR<Exercise>(
        `/api/exercises/exercise/${id}`,
        fetcher
    );
    if (error) return <span>{error}</span>;
    if (!data) return <Spinner />;
    return (
        <>
            <HeadPage title={data.name} />
            <section className="m-5">
                <div>
                    <button
                        onClick={() => router.back()}
                        className="p-4 rounded-full bg-dark-600 hover:opacity-75 transition"
                    >
                        <HiChevronLeft className="text-neutral-50 text-2xl" />
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center my-20 lg:w-[450px] w-full mx-auto">
                    <div className="flex flex-col items-center space-y-5 py-10">
                        <div className="uppercase text-sm font-semibold bg-dark-600 rounded-lg px-2 py-1 flex items-center justify-center my-4 ">
                            <span>{data.target}</span>
                        </div>
                        <div>
                            <Image
                                src={data.gifUrl}
                                alt={data.name}
                                height={300}
                                width={300}
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </div>
                        <div className=" flex flex-col items-center">
                            <h2 className="text-2xl font-bold uppercase tracking-wider text-center mb-5">
                                {data.name}
                            </h2>

                            <div className="space-x-2 bg-gray-700 px-4 py-1 rounded-lg">
                                <span>Body Part:</span>
                                <span className="capitalize">
                                    {data.bodyPart}
                                </span>
                            </div>
                            <div className="space-x-2 bg-gray-600 px-4 py-1 rounded-lg my-4">
                                <span>Equipment:</span>
                                <span className="capitalize">
                                    {data.equipment}
                                </span>
                            </div>
                        </div>
                    </div>
                    <AddExercise exercise={data} />
                </div>
            </section>
        </>
    );
};

export default Exercise;
