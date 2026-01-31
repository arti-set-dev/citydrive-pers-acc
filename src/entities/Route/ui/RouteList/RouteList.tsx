import { Flex, VStack } from '@/shared/ui/Stack';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { Text } from '@/shared/ui/Text/Text';
import { RoutePathResponse } from '../../api/routeApi';
import { RouteItemSkeleton } from '../RouteItem/RouteItemSkeleton';
import { SmartRouteItem } from '../SmartRouteItem/SmartRouteItem';

interface RouteListProps {
  routes?: RoutePathResponse[];
  isLoading?: boolean;
  totalCount?: number;
}

export const RouteList = (props: RouteListProps) => {
  const { routes, isLoading } = props;
  if (isLoading)
    return (
      <VStack gap={8}>
        {[...Array(3)].map((_, i) => (
          <RouteItemSkeleton key={i} />
        ))}
      </VStack>
    );

  if (!routes || routes.length === 0) {
    return (
      <Text color="text-tertiary" align="center">
        Поездок не найдено
      </Text>
    );
  }
  return (
    <VStack>
      {routes?.map((route) => (
        <SmartRouteItem key={route.id} route={route} />
      ))}
      <Flex direction={{ base: 'row', lg: 'row' }} justify="space-between">
        <Pagination currentPage="3" totalPages={10} />
        <Text color="text-tertiary">1-50 из 883</Text>
      </Flex>
    </VStack>
  );
};
