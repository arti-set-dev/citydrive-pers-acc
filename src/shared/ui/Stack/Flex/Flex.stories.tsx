import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const Box = ({
  label,
  color = 'var(--bg-tertiary)',
}: {
  label: string;
  color?: string;
}) => (
  <div
    style={{
      padding: '10px 20px',
      backgroundColor: color,
      border: '1px solid var(--border-primary)',
      borderRadius: '4px',
    }}
  >
    {label}
  </div>
);

const meta: Meta<typeof Flex> = {
  title: 'shared/Stack/Flex',
  component: Flex,
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between'],
    },
    gap: {
      control: 'select',
      options: [0, 4, 8, 16, 24, 32],
    },
    as: {
      control: 'select',
      options: ['div', 'ul', 'ol', 'section', 'main'],
    },
  },
  args: {
    gap: 8,
    children: [
      <Box key="1" label="Item 1" />,
      <Box key="2" label="Item 2" />,
      <Box key="3" label="Item 3" />,
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Row: Story = {
  args: {
    direction: 'row',
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    align: 'start',
  },
};

export const JustifySpaceBetween: Story = {
  args: {
    direction: 'row',
    justify: 'space-between',
    style: { width: '100%' },
  },
};

export const ResponsiveGap: Story = {
  args: {
    direction: 'row',
    gap: { base: 8, md: 16, lg: 32 },
  },
};

export const ListAsUl: Story = {
  args: {
    as: 'ul',
    direction: 'column',
    gap: 4,
    p: 16,
    children: [
      <li key="1">
        <Box label="List Item 1" />
      </li>,
      <li key="2">
        <Box label="List Item 2" />
      </li>,
    ],
    style: { listStyle: 'none', backgroundColor: 'var(--bg-secondary)' },
  },
};
