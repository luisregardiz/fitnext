import axios from 'axios';

import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { tostifyOptions } from '../../helpers/toastify';

export type EditUserProfile = {
    name: string;
    weight: number | string;
    height: number | string;
    gender: string;
    birthday: string;
};

export const updateUserInformation = async (user: EditUserProfile) => {
    const result = await axios.put('/api/user', {
        name: user.name,
        weight: user.weight,
        height: user.height,
        gender: user.gender,
        birthdayDate: user.birthday,
    });

    if (result.status !== 200) {
        toast.error(
            "We couldn't update the user information. Please try again",
            tostifyOptions
        );
    }
    if (result.status === 200) {
        mutate('/api/user');

        toast.success('User information updated successfully.', tostifyOptions);
    }
};
