import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaWeightHanging } from 'react-icons/fa';
import { HiCake, HiMail, HiPencil } from 'react-icons/hi';
import { MdHeight } from 'react-icons/md';
import { TbGenderBigender } from 'react-icons/tb';

interface ProfileInformationProps {
    data: User;
    age: string;
}

const ProfileInformation: FC<ProfileInformationProps> = ({ data, age }) => {
    return (
        <div className="flex flex-col  bg-dark-800 lg:w-[500px] w-full p-5 rounded-lg">
            <div className="flex items-center justify-between mb-5">
                <h4 className="text-lg text-neutral-300 font-semibold">
                    Profile
                </h4>

                <Link href="/me/profile/edit">
                    <a className="bg-dark-500 p-3 rounded-full hover:opacity-75 transition">
                        <HiPencil className="text-neutral-50 text-xl" />
                    </a>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center mb-5">
                <div className="flex flex-col items-center space-y-3 mb-2">
                    <Image
                        src={data.image!}
                        alt={data.name!}
                        height={150}
                        width={150}
                        objectFit="contain"
                        className="rounded-full"
                    />
                    <span className="text-xl font-bold text-cyan-500">
                        {data.name}
                    </span>
                </div>
                <div className="my-5 space-y-4">
                    <div className="flex items-center space-x-2">
                        <HiMail className="text-xl text-neutral-300" />
                        <span>{data.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <HiCake className="text-xl text-neutral-300" />
                        <span>{age}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MdHeight className="text-xl text-neutral-300" />
                        <span>{data.height || 0} cm</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaWeightHanging className="text-xl text-neutral-300" />
                        <span>{data.weight || 0} kg</span>
                    </div>
                    <div className="flex items-center space-x-2 ">
                        <TbGenderBigender className="text-xl text-neutral-300" />
                        <span className="capitalize">
                            {data.gender || 'No gender'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInformation;
