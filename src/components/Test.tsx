import styles from './Test.module.scss';

import clsx from 'clsx';

const color = 'dark';
const isBig = true;

export const Test = () => {
  return (
    <div
      className={clsx(styles.div, color, {
        [styles.big]: isBig,
      })}
    >
      Test
    </div>
  );
};
