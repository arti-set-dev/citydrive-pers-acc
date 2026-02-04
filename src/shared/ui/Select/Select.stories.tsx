import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectOptions } from './Select';
import { useState, useRef, useEffect } from 'react';

interface CountryOption {
  id: number;
  name: string;
  code: string;
}

const options: CountryOption[] = [
  { id: 1, name: 'Россия', code: 'RU' },
  { id: 2, name: 'Казахстан', code: 'KZ' },
  { id: 3, name: 'Узбекистан', code: 'UZ' },
  { id: 4, name: 'Беларусь', code: 'BY' },
];

const meta: Meta<typeof Select> = {
  title: 'shared/Select',
  component: Select,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<SelectOptions<CountryOption>>;

export const DefaultListbox: Story = {
  args: {
    options,
    getOptionLabel: (opt) => opt.name,
    getOptionKey: (opt) => opt.id,
    desc: 'Выберите страну',
  },
};

export const WithSearchCombobox: Story = {
  args: {
    options,
    placeholder: 'Начните вводить название...',
    getOptionLabel: (opt) => opt.name,
    getOptionKey: (opt) => opt.id,
  },
};

export const WithError: Story = {
  args: {
    options,
    error: 'Поле обязательно для заполнения',
    variant: 'outline',
    getOptionLabel: (opt) => opt.name,
  },
};

export const Opened: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(options[0]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const trigger =
        containerRef.current?.querySelector('button') ||
        containerRef.current?.querySelector('input');
      trigger?.click();
    }, []);

    return (
      <div ref={containerRef}>
        <Select {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    options,
    getOptionLabel: (opt) => opt.name,
  },
};
