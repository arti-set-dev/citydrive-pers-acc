import { skipToken } from '@reduxjs/toolkit/query';
import { useGetEmployeeDataQuery } from '@/entities/Employee';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Grid, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

interface RouteDetailsProps {
  employeeId?: string;
  date?: string;
  duration?: number;
  isLoading?: boolean;
}

export const RouteDetails = ({
  employeeId,
  date,
  duration,
  isLoading: isTripLoading,
}: RouteDetailsProps) => {
  const { data: employee, isLoading: isEmpLoading } = useGetEmployeeDataQuery(
    employeeId ?? skipToken,
  );

  const isLoading = isTripLoading || isEmpLoading;

  if (isLoading) {
    return (
      <Grid cols={2} gap={16}>
        <Skeleton width="full" height={24} />
        <Skeleton width="full" height={24} />
      </Grid>
    );
  }

  return (
    <Grid cols={2} gap={16}>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Начало
        </Text>
        <Text color="text-tertiary">
          {employee?.time?.start || '—'}, {date || '—'}
        </Text>
      </HStack>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Расстояние
        </Text>
        <Text color="text-tertiary">{duration ? `${duration} км` : '—'}</Text>
      </HStack>
    </Grid>
  );
};
