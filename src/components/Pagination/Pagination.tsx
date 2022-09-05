import React, { FC, useState } from 'react'
import styles from './Pagination.module.scss'

type PaginationPropsType = {
  currentPage: number
  totalCount: number
  pageSize: number
  pageAmount?: number
  selectPage: (page: number) => void
}
export const Pagination: FC<PaginationPropsType> = ({
  currentPage,
  totalCount,
  pageSize,
  pageAmount = 5,
  selectPage,
}) => {
  let pageCount: number = Math.ceil(totalCount / pageSize)
  let pages: number[] = []
  for (let i = 0; i <= pageCount; i++) {
    pages.push(i)
  }
  let portionCount = Math.ceil(pageCount / pageAmount)
  const [portionNumber, setPortionNumber] = useState(1)
  let portionNumberLeftNumber = (portionNumber - 1) * pageAmount + 1
  let portionNumberRightNumber = portionNumber * pageAmount
  return (
    <div>
      {portionNumber > 1 && (
        <span
          className={styles.pagination}
          onClick={() => setPortionNumber(portionNumber - 1)}>
          {'<'}
        </span>
      )}

      {pages
        .filter(
          p => p >= portionNumberLeftNumber && p <= portionNumberRightNumber
        )
        .map((page, index) => (
          <span
            className={`${currentPage === page ? styles.currentPage : ''} ${
              styles.pagination
            }`}
            key={index}
            onClick={() => selectPage(page)}>
            {page}
          </span>
        ))}

      {portionCount > portionNumber && (
        <span
          className={styles.pagination}
          onClick={() => setPortionNumber(portionNumber + 1)}>
          {'>'}
        </span>
      )}
    </div>
  )
}
