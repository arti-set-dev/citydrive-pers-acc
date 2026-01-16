import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import styles from './RoutePath.module.scss';
import clsx from 'clsx';

export const RoutePath = () => {
  return (
    <VStack as="ul">
      <HStack
        justify="space-between"
        as="li"
        className={clsx(styles.RoutePath, styles.RoutePathStart)}
      >
        <VStack>
          <Text>ул. Пенькова, 28</Text>
          <Text size={14} color="text-tertiary">
            Москва
          </Text>
        </VStack>
        <VStack>
          <Text>15:32</Text>
          <Text size={14} color="text-tertiary">
            18 сентября
          </Text>
        </VStack>
      </HStack>
      <HStack
        justify="space-between"
        as="li"
        className={clsx(styles.RoutePath)}
      >
        <VStack>
          <Text>ул. Пенькова, 28</Text>
          <Text size={14} color="text-tertiary">
            Москва
          </Text>
        </VStack>
        <VStack>
          <Text>15:32</Text>
          <Text size={14} color="text-tertiary">
            18 сентября
          </Text>
        </VStack>
      </HStack>
      <HStack
        justify="space-between"
        as="li"
        className={clsx(styles.RoutePath)}
      >
        <VStack>
          <Text>ул. Пенькова, 28</Text>
          <Text size={14} color="text-tertiary">
            Москва
          </Text>
        </VStack>
        <VStack>
          <Text>15:32</Text>
          <Text size={14} color="text-tertiary">
            18 сентября
          </Text>
        </VStack>
      </HStack>
      <HStack
        justify="space-between"
        as="li"
        className={clsx(styles.RoutePath, styles.RoutePathEnd)}
      >
        <VStack>
          <Text>ул. Пенькова, 28</Text>
          <Text size={14} color="text-tertiary">
            Москва
          </Text>
        </VStack>
        <VStack>
          <Text>15:32</Text>
          <Text size={14} color="text-tertiary">
            18 сентября
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};
