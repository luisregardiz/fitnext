import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import ExercisesSidebar from '../sidebar/exercises-sidebar';
import UserSidebar from '../sidebar/user-sidebar';

interface SidebarResponsiveProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarResponsive: FC<SidebarResponsiveProps> = ({ setOpen }) => {
    return (
        <aside
            onClick={() => setOpen(false)}
            className="w-[280px] min-h-screen h-full fixed top-0 left-0  bg-dark-800  overflow-y-auto sidebar-scroll-custom z-20 pt-20 "
        >
            <div className="flex flex-col h-full w-full">
                <div>
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

export default SidebarResponsive;
