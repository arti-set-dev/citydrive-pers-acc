import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: [10, 12, 13, 14, 16, 18, 20, 24, 28, 32, 40],
    },
    weight: {
      control: 'radio',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: [
        'text-primary',
        'text-secondary',
        'text-tertiary',
        'text-inverse',
        'brand',
        'success',
        'danger',
        'warning',
      ],
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right', 'justify'],
    },
  },
  args: {
    children: 'Пример текста для проверки типографики',
    size: 16,
    color: 'text-primary',
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Heading: Story = {
  args: {
    as: 'h1',
    size: 32,
    weight: 'bold',
    children: 'Заголовок первого уровня',
  },
};

export const ErrorText: Story = {
  args: {
    color: 'danger',
    size: 14,
    children: 'Произошла критическая ошибка',
  },
};

export const ResponsiveSize: Story = {
  args: {
    size: { base: 16, md: 24, lg: 40 },
    children: 'Размер этого текста меняется в зависимости от ширины экрана',
  },
};

export const WithLeader: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '300px', display: 'flex' }}>
        <Story />
        <span>Цена: 100р</span>
      </div>
    ),
  ],
  args: {
    leader: true,
    children: 'Название товара',
  },
};

export const ColorPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {(
        [
          'text-primary',
          'text-secondary',
          'text-tertiary',
          'brand',
          'success',
          'danger',
          'warning',
        ] as const
      ).map((color) => (
        <Text key={color} color={color}>
          Цвет: {color}
        </Text>
      ))}
    </div>
  ),
};
