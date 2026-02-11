import { getGrid } from '@citydrive/shared/lib/stack/grid/getGrid';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { Skeleton } from '@citydrive/shared/ui/Skeleton/Skeleton';
import { VStack } from '@citydrive/shared/ui/Stack';

const stack = getGrid({
  cols: 3,
  gap: 16,
});

export const TripsInfoByMonthSkeleton = () => (
  <Card
    p={24}
    variant="bg-outline"
    r={24}
    className={stack.className}
    style={stack.style}
  >
    {[...Array(3)].map((_, i) => (
      <VStack key={i} gap={4}>
        <Skeleton width={40} height={24} />
        <Skeleton width={100} height={16} />
      </VStack>
    ))}
  </Card>
);
