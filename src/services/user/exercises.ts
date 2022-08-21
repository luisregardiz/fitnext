import axios from 'axios';
import type { MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

import { tostifyOptions } from '../../helpers/toastify';

export const addUserExercise = async (
    e: MouseEvent | any,
    exerciseId: string
) => {
    e.stopPropagation();
    const result = await axios.post('/api/user/exercises', {
        exerciseId,
    });

    if (result.status !== 201) {
        toast.error("We couldn't add the exercise.", tostifyOptions);
    }
    if (result.status === 201) {
        mutate('/api/user/exercises/favorites');
        toast.success('Exercise added successfully.', tostifyOptions);
    }
};

export const removeUserExercise = async (e: MouseEvent | any, id: string) => {
    e.stopPropagation();

    if (id) {
        const result = await axios.delete(
            `/api/user/exercises/favorites/${id}`
        );
        if (result.status !== 200) {
            toast.error("We couldn't remove the exercise.", tostifyOptions);
        }
        if (result.status === 200) {
            mutate('/api/user/exercises');
            mutate('/api/user/exercises/favorites');
            toast.info('Exercise removed successfully.', tostifyOptions);
        }
    }
};
