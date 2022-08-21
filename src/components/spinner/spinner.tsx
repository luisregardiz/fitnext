import { FC } from 'react';

interface SpinnerProps {}

const Spinner: FC<SpinnerProps> = () => {
    return (
        <div className="h-screen flex items-center justify-center ">
            <div className="spinner">
                <div className="dot1"></div>
                <div className="dot2"></div>
            </div>
        </div>
    );
};

export default Spinner;
