import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import styles from './Rate.module.scss';

export const Rate = () => {
  return (
    <VStack>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" className={styles.RateDetailsTerm}>
          Тариф
        </Text>
        <Text>Поминутный, 6 р/мин</Text>
      </HStack>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" className={styles.RateDetailsTerm}>
          Использование
        </Text>
        <Text>530 р</Text>
      </HStack>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" className={styles.RateDetailsTerm}>
          Парковка
        </Text>
        <Text>10 р</Text>
      </HStack>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" className={styles.RateDetailsTerm}>
          Передача
        </Text>
        <Text>0 р</Text>
      </HStack>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" className={styles.RateDetailsTerm}>
          Штрафы
        </Text>
        <Text>2500 р, 2 штрафа</Text>
      </HStack>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" className={styles.RateDetailsTerm}>
          Транспондер
        </Text>
        <Text>300 р</Text>
      </HStack>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" className={styles.RateDetailsTerm}>
          Скидка по промокоду
        </Text>
        <Text color="brand">- 500 р</Text>
      </HStack>
      <HStack justify="space-between" gap={0}>
        <Text weight="bold" size={18} className={styles.RateDetailsTerm}>
          Итого
        </Text>
        <Text weight="bold" size={18}>
          2840 р
        </Text>
      </HStack>
    </VStack>
  );
};
