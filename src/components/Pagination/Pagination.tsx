import React, {FC} from 'react';
// @ts-ignore
import styles from './Pagination.module.scss';

type PaginationPropsType = {
    currentPage: number,
    totalPages: number,
    pageSize: number,
    selectPage: (page: number) => void,
    selectPrevPage: () => void,
    selectNextPage: () => void,
}
export const Pagination: FC<PaginationPropsType> = ({
                                                        currentPage,
                                                        totalPages,
                                                        pageSize,
                                                        selectPage,
                                                        selectPrevPage,
                                                        selectNextPage,
                                                    }) => {

    let pageCount: number = Math.ceil(totalPages / pageSize)
    let pages: number[] = [];
    if (currentPage === 1) {
        pages = [currentPage, currentPage + 1, currentPage + 2]
    } else if (currentPage === pageCount) {
        pages = [currentPage - 1, currentPage - 2, currentPage]
    } else pages = [currentPage - 1, currentPage, currentPage + 1]

    return (

        <div>
            <span className={styles.pagination} onClick={selectPrevPage}>{'<'}</span>
            {pages.map((page, index) => <span
                className={`${currentPage === page ? styles.currentPage : ''} ${styles.pagination}`}
                key={index} onClick={() => selectPage(page)}>{page}</span>)}
            <span className={styles.pagination} onClick={selectNextPage}>{'>'}</span>

        </div>

    );
}

