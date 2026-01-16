import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Grid, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Rate } from '@/widgets/Rate';
import { RideInfo } from '@/widgets/RideInfo';
import { RouteDetails } from '@/widgets/RouteDitails';
import { RouteMap } from '@/widgets/RouteMap';
import { RoutePath } from '@/widgets/RoutePath';

const stack = getVStack({
  gap: 16,
});

const TripPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" weight="bold" size={32}>
        Поездка
      </Text>
      <RideInfo />
      <Grid cols={{ base: 2, lg: 1 }} gap={16}>
        <VStack>
          <Text as="h2" size={24} weight="bold">
            Путь
          </Text>
          <RoutePath />
          <Text as="h2" size={24} weight="bold">
            Детали поездки
          </Text>
          <RouteDetails />
          <Text as="h2" size={24} weight="bold">
            Тариф
          </Text>
          <Rate />
        </VStack>
        <VStack>
          <RouteMap />
        </VStack>
      </Grid>
    </Card>
  );
};

export default TripPage;
