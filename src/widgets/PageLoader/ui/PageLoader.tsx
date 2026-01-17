import { Card } from '@/shared/ui/Card/Card';
import { Loader } from '@/shared/ui/Loader/Loader';
import styles from './PageLoader.module.scss';
import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import clsx from 'clsx';

const stack = getFlex({
  align: 'center',
  justify: 'center',
});

export const PageLoader = () => {
  return (
    <Card
      p={0}
      className={clsx(stack.className, styles.PageLoader)}
      style={stack.style}
    >
      <Loader />
    </Card>
  );
};
