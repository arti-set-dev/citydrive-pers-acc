import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';

export const RouteItemSkeleton = () => (
  <Card p={16} borderLine="bottom">
    <HStack justify="space-between">
      <VStack gap={8}>
        <Skeleton width={40} height={20} />
        <Skeleton width={60} height={16} />
      </VStack>
      <VStack gap={8}>
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
      </VStack>
      <Skeleton width={60} height={24} />
    </HStack>
  </Card>
);
