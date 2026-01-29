import { useMemo, useState } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Button, ButtonOffset, ButtonVariant } from '../Button/Button';
import styles from './Select.module.scss';
import clsx from 'clsx';
import { Text } from '../Text/Text';
import { VStack } from '../Stack';
import ArrowDown from '@/shared/assets/icons/chevron-down.svg';
import { Card } from '../Card/Card';

interface SelectOptions<T> {
  options: T[];
  placeholder?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected?: T | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  offset?: ButtonOffset;
  desc?: string;
  error?: string;
  getOptionLabel?: (option: T) => string;
  getOptionKey?: (option: T) => string | number;
}

export const Select = <T,>({
  options,
  placeholder,
  className,
  selected,
  onChange,
  variant = 'as-field',
  disabled = false,
  desc = '',
  offset,
  error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOptionLabel = (opt: any) => opt?.name || String(opt),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOptionKey = (opt: any) => opt?.id || String(opt),
}: SelectOptions<T>) => {
  const [query, setQuery] = useState('');

  // Находим объект для корректного отображения, если в selected передан ID/строка
  const activeOption = useMemo(() => {
    if (selected === null || selected === undefined) return null;
    if (typeof selected === 'object' && !Array.isArray(selected))
      return selected as T;
    return (
      options.find((opt) => String(getOptionKey(opt)) === String(selected)) ||
      null
    );
  }, [selected, options, getOptionKey]);

  // Приводим onChange к типу, который ожидает Headless UI (T | null)
  const handleChange = (val: T | null) => {
    if (onChange) onChange(val);
  };

  const filteredOptions = useMemo(
    () =>
      query === ''
        ? options
        : options.filter((option) =>
            getOptionLabel(option).toLowerCase().includes(query.toLowerCase()),
          ),
    [query, options, getOptionLabel],
  );

  const errorElement = error && (
    <Text color="danger" size={12}>
      {error}
    </Text>
  );

  if (placeholder) {
    return (
      <Combobox
        value={activeOption}
        onChange={handleChange}
        onClose={() => setQuery('')}
        disabled={disabled}
      >
        <VStack gap={0} className={clsx(styles.Select, className)}>
          <ComboboxInput
            className={styles.Input}
            displayValue={(opt: T) => (opt ? getOptionLabel(opt) : '')}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <Card p={0}>
            <ComboboxOptions modal={false} className={styles.Options}>
              {filteredOptions.map((option) => (
                <ComboboxOption
                  key={getOptionKey(option)}
                  value={option}
                  className={({ focus }) =>
                    clsx(styles.Option, { [styles.focus]: focus })
                  }
                >
                  <Text>{getOptionLabel(option)}</Text>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Card>
          {errorElement}
        </VStack>
      </Combobox>
    );
  }

  return (
    <Listbox
      disabled={disabled}
      value={activeOption ?? undefined}
      onChange={handleChange}
    >
      <VStack gap={0} className={clsx(styles.Select, className)}>
        <ListboxButton as={Button} variant={variant} offset={offset}>
          {activeOption
            ? getOptionLabel(activeOption)
            : desc || (options[0] ? getOptionLabel(options[0]) : '')}
          <ArrowDown />
        </ListboxButton>
        <Card p={0}>
          <ListboxOptions modal={false} className={styles.Options}>
            {options.map((opt) => (
              <ListboxOption
                key={getOptionKey(opt)}
                value={opt}
                className={({ focus }) =>
                  clsx(styles.Option, { [styles.focus]: focus })
                }
              >
                <Text>{getOptionLabel(opt)}</Text>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Card>
        {errorElement}
      </VStack>
    </Listbox>
  );
};
