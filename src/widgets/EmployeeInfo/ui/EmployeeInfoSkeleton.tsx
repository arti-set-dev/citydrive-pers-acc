import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Grid, VStack } from '@/shared/ui/Stack';

export const EmployeeInfoSkeleton = () => (
  <Card p={24} r={24} variant="bg-outline">
    <VStack gap={16}>
      <Skeleton width={200} height={32} />
      {[...Array(5)].map((_, i) => (
        <Grid cols={2} key={i}>
          <Skeleton width={100} height={20} />
          <Skeleton width="80%" height={20} />
        </Grid>
      ))}
    </VStack>
  </Card>
);
