import axios from 'axios';

const fetcher = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        throw new Error();
    }
};

export default fetcher;
