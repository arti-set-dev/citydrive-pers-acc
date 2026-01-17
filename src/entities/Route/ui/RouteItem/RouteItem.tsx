import { Flex, HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import clsx from 'clsx';
import styles from './RouteItem.module.scss';
import { IRoute } from '../RouteList/RouteList';
import { Card } from '@/shared/ui/Card/Card';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';

interface RouteItemProps {
  route: IRoute;
  reverse?: boolean;
}

const stack = getVStack({
  gap: 16,
});

export const RouteItem = (props: RouteItemProps) => {
  const { route, reverse } = props;
  const { price, stops, routeEnd, routeStart } = route;

  const abbreviatedRoute = routeEnd && routeStart && !stops;

  const priceRender = (
    <VStack>
      <Text weight="bold">{price}</Text>
    </VStack>
  );

  if (abbreviatedRoute) {
    return (
      <Card p={16} borderLine="bottom">
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
              <Text>{routeStart.address}</Text>
              <Text color="text-tertiary">{routeStart.city}</Text>
            </VStack>
          </VStack>
          {price && priceRender}
        </HStack>
      </Card>
    );
  }

  return (
    <VStack as="ul">
      {stops?.map((stop) => (
        <Flex
          key={stop.id}
          justify="space-between"
          direction={reverse ? 'row-reverse' : 'row'}
          as="li"
          className={clsx(styles.RoutePath, {
            [styles.RoutePathStart]: stop.isStart,
            [styles.RoutePathEnd]: stop.isEnd,
          })}
        >
          <Card
            p={0}
            width="full"
            className={stack.className}
            style={stack.style}
          >
            <Text>{stop.address}</Text>
            <Text size={14} color="text-tertiary">
              {stop.city}
            </Text>
          </Card>
          <Card
            p={0}
            width="full"
            className={stack.className}
            style={stack.style}
          >
            <Text>{stop.time}</Text>
            <Text size={14} color="text-tertiary">
              {stop.date}
            </Text>
          </Card>
          {price && priceRender}
        </Flex>
      ))}
    </VStack>
  );
};
