import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FaWeight } from 'react-icons/fa';
import { HiUser } from 'react-icons/hi';
import { IoFitness } from 'react-icons/io5';

interface UserSidebarProps {}

const UserSidebar: FC<UserSidebarProps> = () => {
    const router = useRouter();
    return (
        <ul className="text-neutral-300 space-y-2">
            <li>
                <Link href="/me/exercises">
                    <a
                        className={`flex items-center space-x-5 w-full py-3 hover:bg-dark-600 px-5 rounded-lg transition hover:text-neutral-50 ${
                            router.pathname === '/me/exercises' &&
                            'bg-dark-600 text-neutral-50'
                        }`}
                    >
                        <IoFitness className="text-xl text-neutral-400" />
                        <span>My Exercises</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/me/weight">
                    <a
                        className={`flex items-center space-x-5 w-full py-3 hover:bg-dark-600 px-5 rounded-lg transition hover:text-neutral-50 ${
                            router.pathname === '/me/weight' &&
                            'bg-dark-600 text-neutral-50'
                        }`}
                    >
                        <FaWeight className="text-xl text-neutral-400" />
                        <span>Weight Control</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/me/profile">
                    <a
                        className={`flex items-center space-x-5 w-full py-3 hover:bg-dark-600 px-5 rounded-lg transition hover:text-neutral-50 ${
                            (router.pathname === '/me/profile' ||
                                router.pathname === '/me/profile/edit') &&
                            'bg-dark-600 text-neutral-50'
                        }`}
                    >
                        <HiUser className="text-xl text-neutral-400" />
                        <span>My Profile</span>
                    </a>
                </Link>
            </li>
        </ul>
    );
};

export default UserSidebar;
