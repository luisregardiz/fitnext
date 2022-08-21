import { FC } from 'react';
import { bmiIndicator } from '../../helpers/bmi';

interface BMIIndicatorProps {
    bmi: number;
}

const BMIIndicator: FC<BMIIndicatorProps> = ({ bmi }) => {
    const bmiColorIndicator = (bmi: number) => {
        if (bmi < 18.5) {
            return 'border-red-600';
        } else if (bmi >= 18.5 && bmi < 25) {
            return 'border-green-600';
        } else if (bmi >= 25 && bmi < 30) {
            return 'border-yellow-600';
        } else {
            return 'border-red-800';
        }
    };
    return (
        <div className="flex flex-col items-center space-y-10 border-2 border-dark-800 p-5 rounded-lg bg-dark-900 shadow-md shadow-dark-700 my-5 lg:w-auto w-[300px]">
            <div>
                <h4 className="text-2xl font-bold">BMI Indicator</h4>
            </div>
            <div
                className={` flex flex-col items-center justify-center h-32 w-32 rounded-full border-4 ${bmiColorIndicator(
                    bmi
                )}`}
            >
                <span className="font-semibold text-lg">{bmi}</span>
                <span>{bmi === 0 ? 'Add weight' : bmiIndicator(bmi)}</span>
            </div>
            <div className="inline-flex lg:flex-row flex-col items-center lg:space-x-10 space-x-0 lg:space-y-0 space-y-5 border-2 border-neutral-700 p-2 rounded-lg">
                <div className="flex flex-col items-center space-y-1">
                    <span>0 - 18.5</span>
                    <div className="bg-red-600 w-14 h-1 rounded-xl"></div>
                    <span className="text-sm text-neutral-300">
                        Underweight
                    </span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <span>18.5 - 25 </span>
                    <div className="bg-green-600 w-14 h-1 rounded-xl "></div>
                    <span className="text-sm text-neutral-300">Normal</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <span>25 - 30 </span>
                    <div className="bg-yellow-600 w-14 h-1 rounded-xl"></div>
                    <span className="text-sm text-neutral-300">Overweight</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <span>30 - 40 </span>
                    <div className="bg-red-800 w-14 h-1 rounded-xl"></div>
                    <span className="text-sm text-neutral-300">Obesity</span>
                </div>
            </div>
        </div>
    );
};

export default BMIIndicator;
