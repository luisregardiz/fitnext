import { User } from '@prisma/client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Slant as Hamburger } from 'hamburger-react';

import { FC, useState } from 'react';

import useSWR from 'swr';
import fetcher from '../../helpers/fetcher';
import { MdLogout } from 'react-icons/md';
import SidebarResponsive from './sidebar-responsive';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
    const { data: session, status } = useSession();
    const [isOpen, setOpen] = useState<boolean>(false);

    const { data, error } = useSWR<User>('/api/user', fetcher);
    return (
        <>
            <div className="bg-dark-700 py-3 px-5 rounded-lg m-5 shadow-lg ">
                {session && (
                    <div className="flex items-center justify-between space-x-5 ">
                        <button className="md:hidden block z-30">
                            <Hamburger
                                toggled={isOpen}
                                toggle={setOpen}
                                size={20}
                            />
                        </button>
                        <div className="flex items-center space-x-5">
                            <Image
                                src={session?.user?.image!}
                                alt="user image"
                                height={40}
                                width={40}
                                className="rounded-full"
                                objectFit="cover"
                            />
                            <span className="text-gray-300 font-semibold">
                                {data?.name}
                            </span>
                        </div>

                        <div className="flex items-center space-x-10">
                            <button
                                onClick={() =>
                                    signOut({ callbackUrl: '/signin' })
                                }
                                className="px-3 py-2 bg-red-600 hover:shadow-lg hover:shadow-red-600/50 transition rounded-lg"
                            >
                                <MdLogout className="text-xl" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {isOpen && <SidebarResponsive setOpen={setOpen} isOpen={isOpen} />}
        </>
    );
};

export default Navbar;
