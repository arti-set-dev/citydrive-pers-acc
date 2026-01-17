import { Flex, VStack } from '@/shared/ui/Stack';
import { RouteItem } from '../RouteItem/RouteItem';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { Text } from '@/shared/ui/Text/Text';

interface IBaseRoute {
  id: string;
  price?: string;
}

interface IStop {
  id: string;
  address: string;
  city: string;
  time?: string;
  date?: string;
  isStart?: boolean;
  isEnd?: boolean;
}

interface IDirectRoute extends IBaseRoute {
  routeStart: IStop;
  routeEnd: IStop;
  stops?: never;
}

interface IStopsRoute extends IBaseRoute {
  stops: IStop[];
  routeStart?: never;
  routeEnd?: never;
}

export type IRoute = IDirectRoute | IStopsRoute;

interface RouteListProps {
  data: IRoute[];
  reverse?: boolean;
}

export const RouteList = ({ data, reverse }: RouteListProps) => {
  return (
    <VStack>
      {data.map((route) => (
        <RouteItem key={route.id} reverse={reverse} route={route} />
      ))}
      <Flex direction={{ base: 'row', lg: 'row' }} justify="space-between">
        <Pagination currentPage="3" totalPages={10} />
        <Text color="text-tertiary">1-50 из 883</Text>
      </Flex>
    </VStack>
  );
};
