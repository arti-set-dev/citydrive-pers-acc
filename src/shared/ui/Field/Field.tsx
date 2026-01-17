import { ComponentType, InputHTMLAttributes, SVGProps, useState } from 'react';
import styles from './Field.module.scss';
import clsx from 'clsx';
import { IOption, Select } from '../Select/Select';
import { HStack } from '../Stack';
import { PatternFormat } from 'react-number-format';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  defaultValue,
  ...props
}: FieldProps) => {
  const [selectCountry, setSelectCountry] = useState<IOption | null>(
    PHONE_CODES[0] ?? null,
  );

  const inputEl = (
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
              onChange(event);
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
          onChange={onChange}
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
