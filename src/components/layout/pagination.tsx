import { Dispatch, FC, SetStateAction } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    pageCount: number | string;
}

const Pagination: FC<PaginationProps> = ({
    currentPage,
    setCurrentPage,
    pageCount,
}) => {
    return (
        <div className="flex items-center justify-center my-10">
            <div className="flex items-center">
                <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className="p-2 bg-dark-500 font-bold rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaChevronLeft />
                </button>
                <div className="h-10 w-10 flex items-center justify-center">
                    <span className="">{currentPage}</span>
                </div>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === Number(pageCount) - 1}
                    className="p-2 bg-dark-500 font-bold rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
