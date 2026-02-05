import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const GridItem = ({ index }: { index: number }) => (
  <div
    style={{
      padding: '20px',
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-primary)',
      textAlign: 'center',
      borderRadius: '8px',
    }}
  >
    Ячейка {index}
  </div>
);

const meta: Meta<typeof Grid> = {
  title: 'shared/Stack/Grid',
  component: Grid,
  argTypes: {
    cols: {
      control: 'object',
      description: 'Количество колонок (число или Responsive объект)',
    },
    gap: {
      control: 'select',
      description: 'Зазор между ячейками',
    },
  },
  args: {
    gap: 16,
    children: Array.from({ length: 6 }).map((_, i) => (
      <GridItem key={i} index={i + 1} />
    )),
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
type Story = StoryObj<typeof Grid>;

export const FixedCols: Story = {
  args: {
    cols: 3,
  },
};

export const ResponsiveCols: Story = {
  args: {
    cols: { base: 1, md: 2, lg: 3 },
    gap: { base: 8, md: 16, lg: 24 },
  },
};

export const ManyCols: Story = {
  args: {
    cols: 6,
    gap: 4,
    children: Array.from({ length: 12 }).map((_, i) => (
      <GridItem key={i} index={i + 1} />
    )),
  },
};
