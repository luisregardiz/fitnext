import axios from 'axios';
import { mutate } from 'swr';

export const addWeight = async (data: Weight) => {
    try {
        const res = await axios.post('/api/user/weight', data);
        return res;
    } catch (error) {
        throw new Error('Error posting weight!');
    }
};

export const removeWeight = async (id: string) => {
    try {
        const res = await axios.delete(`/api/user/weight/${id}`);
        if (res.status === 200) {
            mutate('/api/user/weight');
            mutate('/api/user/weight/stats');
        }
        return res;
    } catch (error) {
        throw new Error('Error deleting weight!');
    }
};
