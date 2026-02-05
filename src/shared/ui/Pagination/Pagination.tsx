import { Link } from 'react-router-dom';
import { HStack } from '../Stack';
import styles from './Pagination.module.scss';
import ArrowLeft from '@/shared/assets/icons/chevron-left.svg';
import ArrowRight from '@/shared/assets/icons/chevron-right.svg';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const current = Number(currentPage);

  const getPages = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(totalPages - 1, current + delta);
      i++
    ) {
      range.push(i);
    }
    if (current - delta > 2) range.unshift('...');
    if (current + delta < totalPages - 1) range.push('...');
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <HStack
      data-testid="pagination"
      as="ul"
      gap={4}
      className={styles.Container}
    >
      {current > 1 && (
        <Link to={`?page=${current - 1}`} data-testid="pagination-prev">
          <ArrowLeft />
        </Link>
      )}

      {getPages().map((page, idx) => (
        <li key={idx}>
          {page === '...' ? (
            <span data-testid={`pagination-dots-${idx}`}>...</span>
          ) : (
            <Link
              to={`?page=${page}`}
              data-testid={`pagination-page-${page}`}
              className={clsx(styles.Button, {
                [styles.current]: current === page,
              })}
            >
              {page}
            </Link>
          )}
        </li>
      ))}

      {current < totalPages && (
        <Link to={`?page=${current + 1}`} data-testid="pagination-next">
          <ArrowRight />
        </Link>
      )}
    </HStack>
  );
};
