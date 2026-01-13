import { useState } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Button } from '../Button/Button';
import styles from './Select.module.scss';
import clsx from 'clsx';
import { Text } from '../Text/Text';
import { VStack } from '../Stack';
import ArrowDown from '@/shared/assets/icons/chevron-down.svg';
import { Card } from '../Card/Card';

interface IOption {
  id: number;
  name: string;
}

interface SelectOptions {
  options: IOption[];
}

export const Select = ({ options }: SelectOptions) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <VStack gap={0} className={styles.Select}>
        <ListboxButton as={Button} variant="as-field">
          {selected.name}
          <ArrowDown />
        </ListboxButton>

        <Card p={0}>
          <ListboxOptions className={styles.Options}>
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className={({ focus }) =>
                  clsx(styles.Option, {
                    [styles.focus]: focus,
                  })
                }
              >
                {({ selected }) => (
                  <Text
                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                  >
                    {option.name}
                  </Text>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Card>
      </VStack>
    </Listbox>
  );
};
