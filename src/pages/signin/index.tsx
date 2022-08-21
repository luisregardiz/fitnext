import type { GetStaticProps, NextPage } from 'next';

import { getProviders, signIn, useSession } from 'next-auth/react';

import Router from 'next/router';
import { useEffect } from 'react';
import HeadPage from '../../components/layout/head-page';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import FitNextLogo from '../../images/fitnext-logo.png';
interface Provider {
    id: string | number;
    name: string;
}

interface SignInProps {
    providers: Provider;
}

const SignIn: NextPage<SignInProps> = ({ providers }) => {
    const { data: session, status } = useSession();
    useEffect(() => {
        if (session && status === 'authenticated') {
            Router.push('/exercises');
        }
    }, [session, status]);
    return (
        <>
            <HeadPage title="Sign In" />
            <section className="flex items-center justify-center h-screen">
                <div className="flex flex-col  py-5 px-10 border-2 border-dark-700 rounded-lg w-[350px] h-auto shadow-lg shadow-dark-500/50 divide-y divide-dark-500 ">
                    <div className="flex flex-col pb-5">
                        <Image
                            src={FitNextLogo}
                            alt="Logo"
                            height={150}
                            width={150}
                            objectFit="contain"
                        />
                        <p className="italic font-light text-neutral-300 mt-2">
                            The best app for weight control and exercises
                        </p>
                    </div>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name} className=" py-5">
                            <button
                                onClick={() =>
                                    signIn(provider.id, {
                                        callbackUrl: '/',
                                    })
                                }
                                className="btn-signin-provider"
                            >
                                <FcGoogle className="text-2xl" />
                                <span>Sign in with {provider.name}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export const getServerSideProps: GetStaticProps = async (context) => {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
};

export default SignIn;
