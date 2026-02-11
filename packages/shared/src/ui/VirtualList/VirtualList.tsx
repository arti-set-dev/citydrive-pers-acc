import React, { ReactNode } from 'react';
import { Virtuoso, VirtuosoProps } from 'react-virtuoso';
import { VStack } from '../Stack';

interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  onLoadMore?: () => void;
  isFetching?: boolean;
  isLoading?: boolean;
  height?: string | number;
  emptyComponent?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  virtuosoProps?: Partial<VirtuosoProps<T, any>>;
  skeletonComponent?: ReactNode;
  skeletonCount?: number;
}

export const VirtualList = <T,>({
  items,
  renderItem,
  onLoadMore,
  isFetching,
  isLoading,
  height = '80vh',
  emptyComponent,
  virtuosoProps,
  skeletonComponent,
  skeletonCount = 4,
}: VirtualListProps<T>) => {
  const renderSkeletons = (count: number) => (
    <VStack gap={16}>
      {[...Array(count)].map((_, i) => (
        <React.Fragment key={i}>{skeletonComponent}</React.Fragment>
      ))}
    </VStack>
  );

  if (isLoading && items.length === 0) {
    return <>{renderSkeletons(skeletonCount)}</>;
  }

  if (items.length === 0 && !isFetching) {
    return <>{emptyComponent}</>;
  }

  return (
    <Virtuoso
      style={{ height }}
      data={items}
      endReached={onLoadMore}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      itemContent={(index: number, item: any) => renderItem(item, index)}
      components={{
        Footer: () => (isFetching ? renderSkeletons(skeletonCount) : null),
      }}
      useWindowScroll={false}
      {...virtuosoProps}
    />
  );
};
