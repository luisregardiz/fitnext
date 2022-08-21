import { useEffect, useState } from 'react';

export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    return { currentPage, setCurrentPage };
};
