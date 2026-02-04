import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'shared/Pagination',
  component: Pagination,
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Start: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  parameters: {
    router: {
      initialEntries: ['?page=1'],
    },
  },
};

export const Middle: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
  parameters: {
    router: {
      initialEntries: ['?page=5'],
    },
  },
};

export const End: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
  parameters: {
    router: {
      initialEntries: ['?page=10'],
    },
  },
};
export const Small: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};
