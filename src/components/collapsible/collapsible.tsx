import { FC, useState } from 'react';

interface CollapsibleProps {
    children: React.ReactElement;
    targetMuscle: string;
}

const Collapsible: FC<CollapsibleProps> = ({ children, targetMuscle }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <div
            onClick={() => setIsExpanded((prev) => !prev)}
            className="cursor-pointer mb-5"
        >
            <h4 className="uppercase font-bold text-xl border-b border-neutral-500 mb-5 pb-2">
                {targetMuscle}
            </h4>
            {isExpanded && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-auto"
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Collapsible;
