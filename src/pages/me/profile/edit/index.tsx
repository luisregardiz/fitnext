import { User } from '@prisma/client';
import moment from 'moment';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import useSWR from 'swr';
import HeadPage from '../../../../components/layout/head-page';
import Spinner from '../../../../components/spinner/spinner';
import fetcher from '../../../../helpers/fetcher';
import {
    EditUserProfile,
    updateUserInformation,
} from '../../../../services/user/information';

interface EditProfileProps {}

const EditProfile: NextPage<EditProfileProps> = () => {
    const router = useRouter();

    const { data, error } = useSWR<User>('/api/user', fetcher);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<EditUserProfile>({
        defaultValues: {
            name: data?.name!,
            weight: data?.weight || 0,
            height: data?.height || 0,
            gender: data?.gender || '',
            birthday: moment(data?.birthdayDate).format('YYYY-MM-DD') || '',
        },
    });
    const handleUpdateUser: SubmitHandler<EditUserProfile> = (data) => {
        updateUserInformation(data);
    };
    if (!data) return <Spinner />;

    return (
        <div>
            <HeadPage title="Edit Profile" />
            <section className="m-5">
                <div className="bg-dark-800 w-1/2 p-10 rounded-lg">
                    <div className="mb-5">
                        <button onClick={() => router.back()}>
                            <HiOutlineArrowLeft className="text-2xl" />
                        </button>
                    </div>
                    <form
                        onSubmit={handleSubmit(handleUpdateUser)}
                        className="space-y-5"
                    >
                        <div className="flex flex-col space-y-2">
                            <label>Name</label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="p-2 bg-dark-600 rounded-lg outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="flex flex-col space-y-2 basis-1/2">
                                <label>Weight</label>
                                <div className="flex items-center ">
                                    <input
                                        type="number"
                                        {...register('weight', {
                                            required: true,
                                        })}
                                        className="p-2 bg-dark-600 rounded-l-lg outline-none w-full"
                                    />
                                    <div className="bg-dark-500 py-2 px-4 rounded-r-lg">
                                        <span>KG</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2 basis-1/2">
                                <label>Height</label>
                                <div className="flex items-center ">
                                    <input
                                        type="number"
                                        {...register('height', {
                                            required: true,
                                        })}
                                        className="p-2 bg-dark-600 rounded-l-lg outline-none w-full"
                                    />
                                    <div className="bg-dark-500 py-2 px-4 rounded-r-lg">
                                        <span>cm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="flex flex-col space-y-2 basis-1/2">
                                <label>Gender</label>
                                <select
                                    {...register('gender', { required: true })}
                                    className="p-2 bg-dark-600 rounded-lg outline-none w-full"
                                >
                                    <option hidden>Select</option>
                                    <option value="man">Man</option>
                                    <option value="woman">Woman</option>
                                </select>
                            </div>
                            <div className="flex flex-col space-y-2 basis-1/2">
                                <label>Birthday</label>
                                <input
                                    type="date"
                                    {...register('birthday', {
                                        required: true,
                                    })}
                                    className="p-2 bg-dark-600 rounded-lg outline-none"
                                />
                            </div>
                        </div>
                        <div className="pt-5">
                            <button
                                type="submit"
                                className="py-3 px-6 bg-dark-500 rounded-lg hover:opacity-70 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default EditProfile;
