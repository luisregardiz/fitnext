import Head from 'next/head';
import { FC } from 'react';

interface HeadPageProps {
    title: string;
}

const HeadPage: FC<HeadPageProps> = ({ title }) => {
    return (
        <Head>
            <title>{title} | Fitnext</title>
            <meta
                name="description"
                content="Fitnext app for your weight control"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default HeadPage;
