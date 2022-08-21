import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import HeadPage from '../../../components/layout/head-page';
import Spinner from '../../../components/spinner/spinner';
import WeightForm from '../../../components/weight/form';
import fetcher from '../../../helpers/fetcher';
import { tostifyOptions } from '../../../helpers/toastify';
import { addWeight } from '../../../services/user/weight';

import WeightList from '../../../components/weight/list';
import moment from 'moment';
import dynamic from 'next/dynamic';
import WeightStats from '../../../components/weight/stats';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

interface WeightControlProps {}

const WeightControl: NextPage<WeightControlProps> = () => {
    const { data: weight, error: errorWeight } = useSWR<Weight[]>(
        '/api/user/weight',
        fetcher
    );
    const { data: weightStats, error: errorWeightStats } = useSWR<
        WeightStats[]
    >('/api/user/weight/stats', fetcher);

    const onSubmit: SubmitHandler<WeightInputs> = ({ weight, date }) => {
        const weightConvert = Number(weight);
        addWeight({
            weight: weightConvert,
            date: date,
        })
            .then((res) => {
                if (res.status === 201) {
                    mutate('/api/user/weight');
                    mutate('/api/user/weight/stats');
                    toast.success('Weight added successfully', tostifyOptions);
                }
                if (res.status !== 201) {
                    toast.error('Weight error', tostifyOptions);
                }
            })
            .catch((error) => {
                toast.error('Weight error', tostifyOptions);
            });
    };

    const chartWeight = {
        options: {
            chart: {
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            title: {
                text: 'Chart of Weight Control',
            },
            subtitle: {
                text: 'Weight Records',
            },
            labels: weight?.map((w) => moment(w.date).format('L'))!,
            grid: {
                borderColor: '#d4d4d4',
            },
        },
        series: [
            {
                name: 'Weight',
                data: weight?.map((w) => w.weight)!,
            },
        ],
    };

    const { data: session } = useSession();
    useEffect(() => {
        if (!session) {
            Router.push('/signin');
        }
    }, [session]);

    return (
        <div>
            <HeadPage title="Weight Control" />
            <section className="m-5 divide-y-2 divide-dark-700">
                <h1 className="capitalize font-bold text-2xl text-neutral-200 my-5">
                    Weight Control
                </h1>
                <div className="py-5 flex flex-col items-center lg:items-start  gap-5">
                    <div className="flex lg:divide-x-2 divide-x-0 lg:flex-row flex-col-reverse divide-dark-700 lg:space-x-5 space-x-0 ">
                        <WeightForm onSubmit={onSubmit} />
                        {weightStats && (
                            <WeightStats
                                weightStats={weightStats}
                                errorWeightStats={errorWeightStats}
                            />
                        )}
                    </div>
                    <div className="flex lg:flex-row flex-col items-center w-full my-10">
                        <div className="basis-1/2">
                            {!weight && <Spinner />}
                            {errorWeight && <span>{errorWeight.message}</span>}
                            <h4 className="text-xl font-semibold mb-5 text-neutral-200">
                                Weight Records
                            </h4>
                            {weight && <WeightList data={weight} />}
                        </div>
                        <div className="basis-1/2 lg:block hidden">
                            <div className=" text-dark-800 bg-neutral-200 inline-flex lg:w-[550px] w-auto lg:h-[380px] justify-center rounded-lg p-5">
                                <Chart
                                    options={chartWeight.options}
                                    series={chartWeight.series}
                                    type="area"
                                    width="500"
                                    height="350"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WeightControl;
