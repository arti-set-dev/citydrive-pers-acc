import { Card } from '@citydrive/shared/ui/Card/Card';
import { Loader } from '@citydrive/shared/ui/Loader/Loader';
import styles from './PageLoader.module.scss';
import { getFlex } from '@citydrive/shared/lib/stack/flex/getFlex';
import clsx from 'clsx';
import { CSSProperties } from 'react';

const stack = getFlex({
  align: 'center',
  justify: 'center',
});

interface PageLoaderProps {
  style?: CSSProperties;
  className?: string;
}

export const PageLoader = ({ style, className }: PageLoaderProps) => {
  return (
    <Card
      p={0}
      className={clsx(stack.className, styles.PageLoader, className)}
      style={{ ...stack.style, ...style }}
    >
      <Loader />
    </Card>
  );
};
