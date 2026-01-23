import {
  ChangeEvent,
  ComponentType,
  InputHTMLAttributes,
  SVGProps,
  useState,
} from 'react';
import styles from './Field.module.scss';
import clsx from 'clsx';
import { IOption, Select } from '../Select/Select';
import { HStack } from '../Stack';
import { PatternFormat } from 'react-number-format';

interface FieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  type?: 'text' | 'search' | 'number' | 'tel' | 'password' | 'email';
  fullWidth?: boolean;
}

const PHONE_CODES: IOption[] = [
  { id: 1, name: '+7', format: '(###) ###-##-##' },
  { id: 2, name: '+1', format: '### ###-####' },
  { id: 3, name: '+380', format: '### ##-##-##' },
];

export const Field = ({
  value,
  placeholder,
  readOnly,
  onChange,
  type = 'text',
  icon: Icon,
  fullWidth = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  defaultValue,
  ...props
}: FieldProps) => {
  const [selectCountry, setSelectCountry] = useState<IOption | null>(
    PHONE_CODES[0] ?? null,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const inputEl = (
    <input
      value={value}
      type={type}
      readOnly={readOnly}
      onChange={handleChange}
      placeholder={placeholder}
      className={styles.Field}
      {...props}
    />
  );

  if (type === 'tel') {
    return (
      <HStack gap={0}>
        <Select
          selected={selectCountry as IOption}
          onChange={setSelectCountry}
          options={PHONE_CODES}
          className={styles.Select}
        />
        <PatternFormat
          {...props}
          format={selectCountry?.format ?? '(###) ###-##-##'}
          mask="_"
          value={value}
          onValueChange={(values) => {
            if (onChange) {
              const event = {
                target: { value: values.value },
              } as React.ChangeEvent<HTMLInputElement>;
              handleChange(event);
            }
          }}
          className={styles.Field}
          placeholder={placeholder || '(999) 000-00-00'}
        />
      </HStack>
    );
  }
  if (Icon) {
    return (
      <div className={clsx(styles.Wrapper, { [styles.fullWidth]: fullWidth })}>
        <input
          value={value}
          type={type}
          readOnly={readOnly}
          onChange={handleChange}
          placeholder={placeholder}
          className={clsx(styles.Field, { [styles.fullWidth]: fullWidth })}
          {...props}
        />
        <Icon className={styles.Icon} />
      </div>
    );
  }
  return inputEl;
};
