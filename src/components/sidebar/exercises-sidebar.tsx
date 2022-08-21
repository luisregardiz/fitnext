import Link from 'next/link';
import { FC, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { FiBox } from 'react-icons/fi';
import { IoMdFitness } from 'react-icons/io';
import { VscCircleFilled } from 'react-icons/vsc';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { IoBody } from 'react-icons/io5';
import { bodyPart, equipments, muscles } from '../../helpers/exercises-sidebar';
import { useRouter } from 'next/router';
interface ExercisesSidebarProps {}

const ExercisesSidebar: FC<ExercisesSidebarProps> = () => {
    const router = useRouter();
    const { name } = router.query;
    const isEquipments = router.pathname.includes('equipment');
    const isMuscles = router.pathname.includes('muscles');
    const isBodyParts = router.pathname.includes('body-part');
    const [isOpenEquipment, setOpenEquipment] = useState(false);
    const [isOpenMuscles, setOpenMuscles] = useState(false);
    const [isOpenBodyPart, setOpenBodyPart] = useState(false);

    return (
        <ul className="text-neutral-300 space-y-2 ">
            <li>
                <Link href="/exercises">
                    <a
                        className={`flex items-center space-x-5 w-full py-3 hover:bg-dark-600 px-5 rounded-lg transition hover:text-neutral-50 ${
                            router.pathname === '/exercises' &&
                            'bg-dark-600 text-neutral-50'
                        }`}
                    >
                        <IoMdFitness className="text-xl text-neutral-300" />
                        <span>All Exercises</span>
                    </a>
                </Link>
            </li>
            <li>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenEquipment((prev) => !prev);
                    }}
                    className={`flex items-center justify-between   w-full py-3 hover:bg-dark-600 px-5 rounded-lg transition hover:text-neutral-50 ${
                        isEquipments && 'bg-dark-600 text-neutral-50'
                    }`}
                >
                    <div className="flex items-center space-x-5">
                        <FiBox className="text-xl text-neutral-300" />
                        <span>Equipment</span>
                    </div>
                    <FaAngleRight
                        className={`text-xl text-neutral-300 ${
                            isOpenEquipment && 'rotate-90'
                        }`}
                    />
                </button>
                {isOpenEquipment && (
                    <ul className="px-5">
                        {equipments.map((equipment) => (
                            <li key={equipment}>
                                <Link
                                    href={`/exercises/equipments/${equipment.toLowerCase()}`}
                                >
                                    <a
                                        className={`capitalize flex items-center py-2 space-x-2 text-neutral-400 hover:text-neutral-50 ${
                                            name === equipment.toLowerCase() &&
                                            'text-neutral-50'
                                        }`}
                                    >
                                        <VscCircleFilled />
                                        <span>{equipment}</span>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
            <li>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenMuscles((prev) => !prev);
                    }}
                    className={`flex items-center justify-between   w-full py-3 hover:bg-dark-600 px-5 rounded-lg transition hover:text-neutral-50 ${
                        isMuscles && 'bg-dark-600 text-neutral-50'
                    }`}
                >
                    <div className="flex items-center space-x-5">
                        <GiWeightLiftingUp className="text-xl text-neutral-300" />
                        <span>Muscles</span>
                    </div>
                    <FaAngleRight
                        className={`text-xl text-neutral-300 ${
                            isOpenMuscles && 'rotate-90'
                        }`}
                    />
                </button>
                {isOpenMuscles && (
                    <ul className="px-5">
                        {muscles.map((muscle) => (
                            <li key={muscle}>
                                <Link
                                    href={`/exercises/muscles/${muscle.toLowerCase()}`}
                                >
                                    <a
                                        className={`capitalize flex items-center py-2 space-x-2 text-neutral-400 hover:text-neutral-50 ${
                                            name === muscle.toLowerCase() &&
                                            'text-neutral-50'
                                        }`}
                                    >
                                        <VscCircleFilled />
                                        <span>{muscle}</span>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
            <li>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenBodyPart((prev) => !prev);
                    }}
                    className={`flex items-center justify-between   w-full py-3 hover:bg-dark-600 px-5 rounded-lg transition hover:text-neutral-50 ${
                        isBodyParts && 'bg-dark-600 text-neutral-50'
                    }`}
                >
                    <div className="flex items-center space-x-5">
                        <IoBody className="text-xl text-neutral-300" />
                        <span>Body Part</span>
                    </div>
                    <FaAngleRight
                        className={`text-xl text-neutral-300 ${
                            isOpenBodyPart && 'rotate-90'
                        }`}
                    />
                </button>
                {isOpenBodyPart && (
                    <ul className="px-5">
                        {bodyPart.map((part) => (
                            <li key={part}>
                                <Link
                                    href={`/exercises/body-part/${part.toLowerCase()}`}
                                >
                                    <a
                                        className={`capitalize flex items-center py-2 space-x-2 text-neutral-400 hover:text-neutral-50 ${
                                            name === part.toLowerCase() &&
                                            'text-neutral-50'
                                        }`}
                                    >
                                        <VscCircleFilled />
                                        <span>{part}</span>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        </ul>
    );
};

export default ExercisesSidebar;
