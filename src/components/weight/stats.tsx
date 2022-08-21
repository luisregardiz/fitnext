import moment from 'moment';
import { FC } from 'react';

interface WeightStatsProps {
    weightStats: WeightStats[];
    errorWeightStats: any;
}

const WeightStats: FC<WeightStatsProps> = ({
    weightStats,
    errorWeightStats,
}) => {
    return (
        <div className="lg:pl-5 pl-0 lg:pb-0 pb-10">
            {weightStats && (
                <div className="flex lg:flex-row flex-col lg:items-center items-stretch gap-5">
                    {errorWeightStats && (
                        <span>{errorWeightStats.message}</span>
                    )}
                    {weightStats.map((stats) => (
                        <div key={stats.name}>
                            <span className="flex pb-2 font-semibold text-neutral-200">
                                {stats.name}
                            </span>
                            <div className="flex justify-between bg-dark-600 p-5 rounded-lg lg:w-[250px] w-auto ">
                                <div className="flex flex-col space-y-2">
                                    <span className="text-xl font-semibold">
                                        {stats.weight || 0} KG
                                    </span>
                                    <span className="italic text-sm text-neutral-400">
                                        {moment(stats.date).format('ll')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeightStats;
