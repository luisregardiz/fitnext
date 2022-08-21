import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { FC, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Spinner from '../spinner/spinner';
import Navbar from './navbar';
import Sidebar from './sidebar';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
    children: React.ReactElement;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const { data: session, status } = useSession();

    // useEffect(() => {
    //     if (!session || status !== 'authenticated') {
    //         Router.push('/signin');
    //     }
    // }, [session, status]);
    if (status === 'loading') return <Spinner />;

    const mainStyle = `bg-dark-900 w-full min-h-screen max-w-[1650px] mx-auto ${
        session && 'md:pl-[280px] pl-0'
    }`;
    return (
        <div className="flex">
            {session && <Sidebar />}

            <main className={mainStyle}>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    theme="dark"
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {session && <Navbar />}

                {children}
            </main>
        </div>
    );
};

export default Layout;
