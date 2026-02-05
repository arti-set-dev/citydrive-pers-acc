import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';
import CalendarIcon from '@/shared/assets/icons/calendar-minus.svg';
import HomeIcon from '@/shared/assets/icons/house.svg';
import { useState } from 'react';

const meta: Meta<typeof Field> = {
  title: 'shared/Field',
  component: Field,
  decorators: [
    (Story) => (
      <div data-screenshot="true">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onChange: { action: 'changed' },
    type: {
      control: 'select',
      options: ['text', 'search', 'number', 'tel', 'password', 'email'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
    type: 'text',
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Выберите дату',
    icon: CalendarIcon,
    readOnly: true,
  },
};

export const Search: Story = {
  args: {
    placeholder: 'Поиск...',
    type: 'search',
    icon: HomeIcon,
  },
};

export const Telephone: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Field {...args} value={value} onChange={setValue} />;
  },
  args: {
    type: 'tel',
    placeholder: '(999) 000-00-00',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Ошибка ввода',
    value: 'Некорректные данные',
    error: 'Это поле обязательно для заполнения',
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Растянут на всю ширину',
    fullWidth: true,
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Введите пароль',
    type: 'password',
  },
};
