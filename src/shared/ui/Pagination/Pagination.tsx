import { Link } from 'react-router-dom';
import { HStack } from '../Stack';
import styles from './Pagination.module.scss';
import ArrowLeft from '@/shared/assets/icons/chevron-left.svg';
import ArrowRight from '@/shared/assets/icons/chevron-right.svg';
import clsx from 'clsx';

interface PaginationProps {
  currentPage: string;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const current = Number(currentPage);

  const displayPagesCount = totalPages > 4 ? 3 : totalPages;
  const pages = Array.from({ length: displayPagesCount }, (_, i) => i + 1);

  const showNext = totalPages > 4;
  const showPrev = current > 1;

  return (
    <HStack as="ul" gap={4}>
      {showPrev && (
        <li>
          <Link className={styles.PaginationLink} to={`?page=${current - 1}`}>
            <ArrowLeft className={styles.Arrow} />
          </Link>
        </li>
      )}

      {pages.map((page) => (
        <li key={page}>
          <Link
            to={`?page=${page}`}
            className={clsx(styles.Button, {
              [styles.current]: current === page,
            })}
          >
            {page}
          </Link>
        </li>
      ))}

      {showNext && (
        <li>
          <Link to={`?page=${current + 1}`}>
            <ArrowRight className={styles.Arrow} />
          </Link>
        </li>
      )}
    </HStack>
  );
};
