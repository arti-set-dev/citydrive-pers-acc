import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-outline'],
    },
    borderLine: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom', 'none'],
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'header', 'form', 'ul', 'li'],
    },
    p: { control: 'number' },
    r: { control: 'select', options: [0, 4, 8, 16, 24, 32] },
  },
  args: {
    children:
      'Это контент карточки. Здесь может быть любой текст или компоненты.',
    p: 16,
    r: 8,
  },
  decorators: [
    (Story) => (
      <div data-screenshot="true">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    variant: 'bg-primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'bg-secondary',
  },
};

export const WithShadow: Story = {
  args: {
    variant: 'bg-primary',
    shadow: true,
  },
};

export const Outline: Story = {
  args: {
    variant: 'bg-outline',
  },
};

export const BorderLeft: Story = {
  args: {
    variant: 'bg-primary',
    borderLine: 'left',
  },
};

export const ResponsivePadding: Story = {
  args: {
    variant: 'bg-secondary',
    p: { base: 8, md: 16, lg: 32 },
    children:
      'У этого компонента разный padding на разных брейкпоинтах (base: 8, md: 16, lg: 32)',
  },
};

export const CustomWidth: Story = {
  args: {
    variant: 'bg-tertiary',
    width: 280,
    children: 'Карточка фиксированной ширины 280px',
  },
};

export const Polymorphic: Story = {
  args: {
    as: 'form',
    variant: 'bg-primary',
    children: (
      <fieldset>
        <legend>Карточка в роли формы</legend>
        <input type="text" placeholder="Введите что-то..." />
      </fieldset>
    ),
  },
};
