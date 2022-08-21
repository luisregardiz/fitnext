import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session && status === 'authenticated') {
            Router.push('/exercises');
        }

        if (status === 'unauthenticated') {
            Router.push('/signin');
        }
    }, [session, status]);
    return null;
};

export default Home;
