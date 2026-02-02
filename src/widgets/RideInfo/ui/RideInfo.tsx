import { useGetEmployeeDataQuery } from '@/entities/Employee';
import { useGetBillingInfoQuery, useGetCarByIdQuery } from '@/entities/Route';
import { getGrid } from '@/shared/lib/stack/grid/getGrid';
import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Status } from '@/shared/ui/Status/Status';
import { Text } from '@/shared/ui/Text/Text';
import { skipToken } from '@reduxjs/toolkit/query';

const grid = getGrid({
  cols: { base: 4, lg: 2, sm: 1 },
  gap: 16,
});

interface RideInfoProps {
  tripId?: string;
  employeeId?: string;
  carId?: string;
  isLoading?: boolean;
}

export const RideInfo = ({
  tripId,
  employeeId,
  carId,
  isLoading: isTripLoading,
}: RideInfoProps) => {
  const { data: employee, isLoading: isEmpLoading } = useGetEmployeeDataQuery(
    employeeId ?? skipToken,
  );
  const { data: car, isLoading: isCarLoading } = useGetCarByIdQuery(
    carId ?? skipToken,
  );
  const { data: billing } = useGetBillingInfoQuery(tripId ?? skipToken);

  const isLoading = isTripLoading || isEmpLoading || isCarLoading;
  if (isLoading) {
    return (
      <Card
        p={24}
        r={16}
        variant="bg-outline"
        className={grid.className}
        style={grid.style}
      >
        {[...Array(4)].map((_, i) => (
          <VStack gap={16} key={i}>
            <Skeleton width={80} height={14} />
            <Skeleton width={120} height={20} />
            <Skeleton width={100} height={18} />
          </VStack>
        ))}
      </Card>
    );
  }
  return (
    <Card
      p={24}
      r={16}
      variant="bg-outline"
      className={grid.className}
      style={grid.style}
    >
      <VStack gap={16}>
        <Text size={14} color="text-tertiary">
          Сотрудник
        </Text>
        <Text color="brand" weight="bold">
          {employee?.name}
        </Text>
        <Text>{employee?.phone}</Text>
      </VStack>
      <VStack gap={16}>
        <Text size={14} color="text-tertiary">
          Машина
        </Text>
        <Text weight="bold">{car?.model}</Text>
        <Text>{car?.number}</Text>
      </VStack>
      <VStack gap={16}>
        <Text size={14} color="text-tertiary">
          Статус
        </Text>
        <HStack>
          <Status status={employee?.status ?? 'inactive'} />
          <Text weight="bold">
            {employee?.status === 'active' ? 'Активен' : 'Неактивен'}
          </Text>
        </HStack>
      </VStack>
      <VStack gap={16}>
        <Text size={14} color="text-tertiary">
          Стоимость
        </Text>
        <Text weight="bold">{billing?.totalPrice ?? 0} р</Text>
      </VStack>
    </Card>
  );
};
