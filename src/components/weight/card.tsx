import moment from 'moment';
import { FC } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { removeWeight } from '../../services/user/weight';

interface WeightCardProps {
    weight: Weight;
}

const WeightCard: FC<WeightCardProps> = ({ weight }) => {
    return (
        <div
            key={weight.id}
            className="flex items-center justify-between bg-dark-800 p-5 rounded-lg w-full space-x-2"
        >
            <span className="text-lg font-semibold">
                {Number(weight.weight).toFixed(2)} KG
            </span>
            <span className="italic text-sm text-neutral-400">
                {moment(weight.date).format('LL')}
            </span>

            <div>
                <button
                    onClick={() => removeWeight(weight.id!)}
                    className="p-2 rounded-lg bg-dark-500 hover:opacity-70 transition"
                >
                    <HiOutlineTrash />
                </button>
            </div>
        </div>
    );
};

export default WeightCard;
