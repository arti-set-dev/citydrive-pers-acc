import { skipToken } from '@reduxjs/toolkit/query';

import { Skeleton } from '@citydrive/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@citydrive/shared/ui/Stack';
import { Text } from '@citydrive/shared/ui/Text/Text';
import {
  useGetBillingInfoQuery,
  useGetRateByIdQuery,
} from '@citydrive/entities/Route';

interface RateProps {
  tripId?: string;
  isLoading?: boolean;
}

export const Rate = ({ tripId, isLoading: isTripLoading }: RateProps) => {
  const { data: billing, isLoading: isBillLoading } = useGetBillingInfoQuery(
    tripId ?? skipToken,
  );

  const { data: rate, isLoading: isRateLoading } = useGetRateByIdQuery(
    billing?.rateId ?? skipToken,
  );

  const isLoading = isTripLoading || isBillLoading || isRateLoading;

  if (isLoading) {
    return (
      <VStack gap={8}>
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} width="full" height={24} />
        ))}
      </VStack>
    );
  }

  if (!billing) return null;

  return (
    <VStack gap={4}>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Тариф
        </Text>
        <Text>
          {rate?.name === 'minute' ? 'Поминутный' : 'Часовой'}, {rate?.price} р/
          {rate?.name === 'minute' ? 'мин' : 'час'}
        </Text>
      </HStack>

      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Использование
        </Text>
        <Text>{billing.usageCost} р</Text>
      </HStack>

      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Парковка
        </Text>
        <Text>{billing.parkingCost} р</Text>
      </HStack>

      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Передача
        </Text>
        <Text>{billing.transferCost} р</Text>
      </HStack>

      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Штрафы
        </Text>
        <Text>
          {billing.fines.amount} р, {billing.fines.count} штрафа
        </Text>
      </HStack>

      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Транспондер
        </Text>
        <Text>{billing.transponder} р</Text>
      </HStack>

      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Скидка по промокоду
        </Text>
        <Text color="brand">- {billing.promoDiscount} р</Text>
      </HStack>

      <HStack justify="space-between" gap={0}>
        <Text weight="bold" size={18} leader>
          Итого
        </Text>
        <Text weight="bold" size={18}>
          {billing.totalPrice} р
        </Text>
      </HStack>
    </VStack>
  );
};
