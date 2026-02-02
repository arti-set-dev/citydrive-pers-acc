import { Flex, HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import clsx from 'clsx';
import styles from './RouteItem.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { IRoute } from '../../model/route';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteTrip } from '@/shared/lib/router/paths';

interface RouteItemProps {
  route: IRoute;
}

const stack = getVStack({
  gap: 16,
});

export const RouteItem = (props: RouteItemProps) => {
  const { route } = props;
  const { price, stops, routeEnd, routeStart, id } = route;

  const abbreviatedRoute = routeEnd && routeStart && !stops;

  const wrapWithLink = (children: React.ReactNode) => (
    <AppLink variant="regular" to={getRouteTrip(id)}>
      {children}
    </AppLink>
  );

  const priceRender = (
    <VStack>
      <Text weight="bold">{price}</Text>
    </VStack>
  );

  if (abbreviatedRoute) {
    return (
      <Card p={16} borderLine="bottom">
        {wrapWithLink(
          <HStack justify="space-between" align="start">
            <VStack>
              <Text>{routeStart.time}</Text>
              <Text color="text-tertiary">{routeStart.date}</Text>
            </VStack>
            <VStack as="ul">
              <VStack
                as="li"
                className={clsx(styles.RoutePath, styles.RoutePathStart)}
              >
                <Text>{routeStart.address}</Text>
                <Text color="text-tertiary">{routeStart.city}</Text>
              </VStack>
              <VStack
                as="li"
                className={clsx(styles.RoutePath, styles.RoutePathEnd)}
              >
                <Text>{routeEnd.address}</Text>{' '}
                <Text color="text-tertiary">{routeEnd.city}</Text>
              </VStack>
            </VStack>
            {price && priceRender}
          </HStack>,
        )}
      </Card>
    );
  }

  return (
    <VStack as="ul">
      {stops?.map((stop) => (
        <Flex
          key={stop.id}
          justify="space-between"
          as="li"
          className={clsx(styles.RoutePath, {
            [styles.RoutePathStart]: stop.isStart,
            [styles.RoutePathEnd]: stop.isEnd,
          })}
        >
          {wrapWithLink(
            <HStack justify="space-between">
              <Card p={0} className={stack.className} style={stack.style}>
                <Text>{stop.address}</Text>
                <Text size={14} color="text-tertiary">
                  {stop.city}
                </Text>
              </Card>
              <Card p={0} className={stack.className} style={stack.style}>
                <Text>{stop.time}</Text>
                <Text size={14} color="text-tertiary">
                  {stop.date}
                </Text>
              </Card>
              {price && priceRender}
            </HStack>,
          )}
        </Flex>
      ))}
    </VStack>
  );
};
