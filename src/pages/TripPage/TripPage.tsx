import { useGetRouteByIdQuery } from '@citydrive/entities/Route';
import { getVStack } from '@citydrive/shared/lib/stack/flex/getVStack';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { Grid, VStack } from '@citydrive/shared/ui/Stack';
import { Text } from '@citydrive/shared/ui/Text/Text';
import { Rate } from '@/widgets/Rate';
import { RideInfo } from '@/widgets/RideInfo';
import { RouteDetails } from '@/widgets/RouteDitails';
import { RouteMap } from '@/widgets/RouteMap';
import { RoutePath } from '@/widgets/RoutePath';
import { useParams } from 'react-router-dom';

const stack = getVStack({
  gap: 16,
});

const TripPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: route,
    isLoading: isRouteLoading,
    error,
  } = useGetRouteByIdQuery(id ?? '');

  if (error) {
    return <Text color="danger">Ошибка при загрузке данных поездки</Text>;
  }
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" weight="bold" size={32}>
        Поездка
      </Text>
      <RideInfo
        tripId={id}
        employeeId={route?.employeeId}
        carId={route?.carId}
        isLoading={isRouteLoading}
      />
      <Grid cols={{ base: 2, lg: 1 }} gap={16}>
        <VStack>
          <Text as="h2" size={24} weight="bold">
            Путь
          </Text>
          <RoutePath
            tripId={id}
            stopsIds={route?.stopsIds}
            isLoading={isRouteLoading}
          />
          <Text as="h2" size={24} weight="bold">
            Детали поездки
          </Text>
          <RouteDetails
            employeeId={route?.employeeId}
            date={route?.date}
            duration={route?.duration}
            isLoading={isRouteLoading}
          />
          <Text as="h2" size={24} weight="bold">
            Тариф
          </Text>
          <Rate tripId={id} isLoading={isRouteLoading} />
        </VStack>
        <VStack>
          <RouteMap stopsIds={route?.stopsIds} isLoading={isRouteLoading} />
        </VStack>
      </Grid>
    </Card>
  );
};

export default TripPage;
