import { User } from '@prisma/client';
import type { NextPage } from 'next';
import useSWR from 'swr';
import HeadPage from '../../../components/layout/head-page';
import Spinner from '../../../components/spinner/spinner';
import fetcher from '../../../helpers/fetcher';
import moment from 'moment';
import { getBMI } from '../../../helpers/bmi';
import BMIIndicator from '../../../components/bmi/indicator';
import ProfileInformation from '../../../components/profile/profile';
interface MyProfileProps {}

const MyProfile: NextPage<MyProfileProps> = () => {
    const { data, error } = useSWR<User>('/api/user', fetcher);
    if (!data) return <Spinner />;

    const age = data.birthdayDate
        ? moment().diff(data.birthdayDate, 'years', false) + ' years old'
        : 'No birthday date';

    const bmi = getBMI(data.weight!, data.height!) || 0;

    return (
        <div>
            <HeadPage title="My Profile" />
            <section className="mx-5 my-10">
                <div className="flex lg:flex-row flex-col items-center gap-x-10">
                    {data && <ProfileInformation data={data} age={age} />}

                    <BMIIndicator bmi={bmi} />
                </div>
            </section>
        </div>
    );
};

export default MyProfile;
