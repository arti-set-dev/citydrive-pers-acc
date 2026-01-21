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

export interface IOption {
  id: number;
  name: string;
  format?: string;
}

interface SelectOptions<T extends IOption> {
  options: T[];
  placeholder?: string;
  className?: string;
  selected?: T | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: T | null | any) => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  offset?: ButtonOffset;
  desc?: string;
}

export const Select = <T extends IOption>({
  options,
  placeholder,
  className,
  selected,
  onChange,
  variant = 'as-field',
  disabled = false,
  desc = '',
  offset,
}: SelectOptions<T>) => {
  const [query, setQuery] = useState('');
  const filteredOptions = useMemo(
    () =>
      query === ''
        ? options
        : options.filter((option) =>
            option.name.toLowerCase().includes(query.toLowerCase()),
          ),
    [query, options],
  );

  if (placeholder) {
    return (
      <Combobox
        value={selected}
        onChange={onChange}
        onClose={() => setQuery('')}
        disabled={disabled}
      >
        <VStack gap={0} className={styles.Select}>
          <ComboboxInput
            className={styles.Input}
            displayValue={(option: IOption) => option?.name || ''}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />

          <Card p={0}>
            <ComboboxOptions modal={false} className={styles.Options}>
              {filteredOptions.map((option) => (
                <ComboboxOption
                  key={option.id}
                  value={option}
                  className={({ focus }) =>
                    clsx(styles.Option, {
                      [styles.focus]: focus,
                    })
                  }
                >
                  <Text>{option.name}</Text>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Card>
        </VStack>
      </Combobox>
    );
  }

  return (
    <Listbox disabled={disabled} value={selected} onChange={onChange}>
      <VStack gap={0} className={clsx(styles.Select, className)}>
        <ListboxButton as={Button} variant={variant} offset={offset}>
          {selected?.name || desc || options[0].name}
          <ArrowDown />
        </ListboxButton>
        <Card p={0}>
          <ListboxOptions modal={false} className={styles.Options}>
            {options.map((opt) => (
              <ListboxOption
                key={opt.id}
                value={opt}
                className={({ focus }) =>
                  clsx(styles.Option, { [styles.focus]: focus })
                }
              >
                <Text>{opt.name}</Text>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Card>
      </VStack>
    </Listbox>
  );
};
