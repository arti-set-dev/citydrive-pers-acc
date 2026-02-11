import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { VStack, HStack } from '../Stack';

const meta: Meta<typeof Skeleton> = {
  title: 'shared/Skeleton',
  component: Skeleton,
  decorators: [
    (Story) => (
      <div data-screenshot="true">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Normal: Story = {
  args: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
};

export const Circle: Story = {
  args: {
    width: 100,
    height: 100,
    borderRadius: '50%',
  },
};

export const StaticForScreenshot: Story = {
  args: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
};

export const SkeletonGroup: Story = {
  render: () => (
    <div data-screenshot="true">
      <HStack gap={16} align="center">
        <Skeleton width={50} height={50} borderRadius="50%" />
        <VStack gap={8} style={{ flexGrow: 1 }}>
          <Skeleton width="40%" height={16} borderRadius={4} />
          <Skeleton width="80%" height={12} borderRadius={4} />
        </VStack>
      </HStack>
    </div>
  ),
};
