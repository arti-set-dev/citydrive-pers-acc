import { skipToken } from '@reduxjs/toolkit/query';
import { IRoute, RouteItem, useGetStopsQuery } from '@/entities/Route';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { VStack } from '@/shared/ui/Stack';

interface RoutePathProps {
  tripId?: string;
  stopsIds?: string[];
  isLoading?: boolean;
}

export const RoutePath = ({
  tripId,
  stopsIds,
  isLoading: isTripLoading,
}: RoutePathProps) => {
  const { data: stops, isLoading: isStopsLoading } = useGetStopsQuery(
    stopsIds ?? skipToken,
  );

  const isLoading = isTripLoading || isStopsLoading;

  if (isLoading) {
    return (
      <VStack gap={16}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} width="full" height={60} borderRadius={8} />
        ))}
      </VStack>
    );
  }

  if (!stops || stops.length === 0) {
    return null;
  }

  const route: IRoute = {
    id: tripId || '',
    stops: stops.map((stop, index) => ({
      ...stop,
      isStart: index === 0,
      isEnd: index === stops.length - 1,
    })),
  };

  return <RouteItem route={route} />;
};
