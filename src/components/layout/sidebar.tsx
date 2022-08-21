import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import FitNextLogo from '../../images/fitnext-logo.png';

import ExercisesSidebar from '../sidebar/exercises-sidebar';

import UserSidebar from '../sidebar/user-sidebar';

const Sidebar = () => {
    return (
        <aside className="w-[280px] min-h-screen h-full fixed top-0 left-0  bg-dark-800  overflow-y-auto sidebar-scroll-custom md:block hidden ">
            <div className="flex flex-col h-full w-full">
                <div>
                    <Link href="/me/profile">
                        <a className="flex items-center justify-center mb-5">
                            <Image
                                src={FitNextLogo}
                                alt="Logo"
                                height={100}
                                width={100}
                                objectFit="contain"
                            />
                        </a>
                    </Link>
                    <nav className="my-5">
                        <div className="mx-5 ">
                            <span className="px-5 uppercase font-bold text-neutral-500 text-sm tracking-wider inline-block mb-4">
                                Exercises
                            </span>
                            <ExercisesSidebar />
                        </div>
                        <div className="mx-5 my-5">
                            <span className="px-5 uppercase font-bold text-neutral-500 text-sm tracking-wider inline-block mb-4">
                                User
                            </span>
                            <UserSidebar />
                        </div>
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
