import { FC } from 'react';

import WeightCard from './card';

interface WeightListProps {
    data: Weight[];
}

const WeightList: FC<WeightListProps> = ({ data }) => {
    return (
        <div className="flex flex-col gap-5 bg-dark-600 p-10 rounded-lg lg:w-[500px] w-auto h-[500px] overflow-y-auto sidebar-scroll-custom">
            {data.length === 0 && <span>No weight records.</span>}
            {data.map((weight) => (
                <WeightCard key={weight.id} weight={weight} />
            ))}
        </div>
    );
};

export default WeightList;
