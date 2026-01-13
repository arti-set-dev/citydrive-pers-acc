import clsx from 'clsx';
import styles from './Status.module.scss';

interface StatusProps {
  status: 'active' | 'inactive';
}

export const Status = ({ status }: StatusProps) => {
  const titleMessage = status === 'active' ? 'Активен' : 'Не активен';

  return (
    <div className={clsx(styles.Status, styles[status])} title={titleMessage} />
  );
};
