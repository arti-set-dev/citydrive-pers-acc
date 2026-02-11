import type { Meta, StoryObj } from '@storybook/react';
import { VirtualList } from './VirtualList';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';
import { Skeleton } from '../Skeleton/Skeleton';
import { VStack } from '../Stack';

const MOCK_ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  title: `Элемент списка №${i + 1}`,
  description: 'Описание виртуализированного элемента для проверки скролла',
}));

const meta: Meta<typeof VirtualList> = {
  title: 'shared/VirtualList',
  component: VirtualList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VirtualList<(typeof MOCK_ITEMS)[0]>>;

const renderItem = (item: (typeof MOCK_ITEMS)[0]) => (
  <div style={{ padding: '8px 0' }}>
    <Card p={16} variant="bg-secondary">
      <VStack gap={4}>
        <Text weight="semibold">{item.title}</Text>
        <Text size={12} color="text-tertiary">
          {item.description}
        </Text>
      </VStack>
    </Card>
  </div>
);

const SkeletonItem = (
  <div style={{ padding: '8px 0' }} data-screenshot="true">
    <Skeleton width="100%" height={74} borderRadius={16} />
  </div>
);

export const Default: Story = {
  args: {
    items: MOCK_ITEMS,
    renderItem: renderItem,
    height: '400px',
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
    skeletonComponent: SkeletonItem,
    skeletonCount: 5,
    height: '400px',
  },
};

export const FetchingMore: Story = {
  args: {
    items: MOCK_ITEMS.slice(0, 5),
    isFetching: true,
    renderItem: renderItem,
    skeletonComponent: SkeletonItem,
    skeletonCount: 2,
    height: '400px',
  },
};

export const Empty: Story = {
  args: {
    items: [],
    height: '400px',
    emptyComponent: (
      <Card p={24} variant="bg-outline">
        <Text align="center" color="text-tertiary">
          Данные не найдены
        </Text>
      </Card>
    ),
  },
};
