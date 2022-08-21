import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface WeightFormProps {
    onSubmit: SubmitHandler<WeightInputs>;
}

const WeightForm: FC<WeightFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WeightInputs>();

    return (
        <div className="w-[350px] basis-1/4 p-8 bg-dark-800 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-neutral-200">Weight</label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            step="any"
                            {...register('weight', {
                                required: true,
                            })}
                            className={`bg-dark-600 p-2 rounded-l-lg text-neutral-50 outline-none  w-full ${
                                errors.weight &&
                                'border-2 border-red-500 shadow-lg shadow-red-500/50'
                            }`}
                        />
                        <div className="bg-dark-500 px-4 py-2 rounded-r-lg font-semibold">
                            <span>KG</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 my-5">
                    <label className="text-sm text-neutral-200">Date</label>
                    <input
                        type="date"
                        {...register('date', { required: true })}
                        className={`bg-dark-600 p-2 rounded-lg text-neutral-50 outline-none w-full ${
                            errors.date &&
                            'border-2 border-red-500 shadow-lg shadow-red-500/50'
                        }`}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-dark-500 rounded-lg mt-5 hover:shadow-lg hover:shadow-dark-500/50 transition"
                >
                    Add weight
                </button>
            </form>
        </div>
    );
};

export default WeightForm;
