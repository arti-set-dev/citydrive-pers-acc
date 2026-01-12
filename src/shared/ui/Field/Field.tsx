import { ComponentType, InputHTMLAttributes, SVGProps } from 'react';
import styles from './Field.module.scss';
import clsx from 'clsx';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: () => void;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  type?: 'text' | 'search' | 'number';
  fullWidth?: boolean;
}

export const Field = ({
  value,
  placeholder,
  readOnly,
  onChange,
  type = 'text',
  icon: Icon,
  fullWidth = false,
  ...props
}: FieldProps) => {
  if (Icon) {
    return (
      <div className={clsx(styles.Wrapper, { [styles.fullWidth]: fullWidth })}>
        <input
          value={value}
          type={type}
          readOnly={readOnly}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.Field}
          {...props}
        />
        <Icon className={styles.Icon} />
      </div>
    );
  }
  return (
    <input
      value={value}
      type={type}
      readOnly={readOnly}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.Field}
      {...props}
    />
  );
};
