import React from 'react';
import styles from './Pagination.module.scss';

export const Pagination = ({
                          currentPage,
                          totalPages,
                          pageSize,
                          selectPage,
                          selectPrevPage,
                          selectNextPage,
                      }) => {

    let pageCount = Math.ceil(totalPages / pageSize)
    let pages = [];
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

