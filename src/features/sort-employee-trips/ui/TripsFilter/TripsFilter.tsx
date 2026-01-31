import { RouteList, useGetRoutesQuery } from '@/entities/Route';

import { Select } from '@/shared/ui/Select/Select';
import { Flex, Grid, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

interface SelectOption {
  id: number | string;
  name: string;
}

const priceOptions = [
  { id: 1, name: 'По убыванию' },
  { id: 2, name: 'По возростанию' },
];

interface TripsFilterProps {
  employeeId: string;
  dateRange?: DateRange;
  priceSort?: SelectOption | null;
  onPriceSortChange?: (value: SelectOption | null) => void;
}

export const TripsFilter = ({
  employeeId,
  dateRange,
  priceSort,
  onPriceSortChange,
}: TripsFilterProps) => {
  const [dateSelected, setDateSelected] = useState<SelectOption | null>(null);

  const { data: routes } = useGetRoutesQuery({ employeeId });

  const dateOptions = useMemo(() => {
    if (!routes || !Array.isArray(routes)) return [];

    const uniqueDates = Array.from(new Set(routes.map((r) => r.date))).sort(
      (a, b) => b.localeCompare(a),
    );

    const options = uniqueDates.map((date, index) => ({
      id: index + 1,
      name: date,
    }));

    return [{ id: 'all', name: 'Все' }, ...options];
  }, [routes]);

  const {
    data: filteredRoutes,
    isLoading,
    isFetching,
  } = useGetRoutesQuery({
    employeeId,
    date:
      dateSelected?.id === 'all' || !dateSelected
        ? undefined
        : dateSelected.name,
    sort: priceSort?.id === 1 ? '-price' : 'price',
    startDate: dateRange?.from
      ? format(dateRange.from, 'yyyy-MM-dd')
      : undefined,
    endDate: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
  });

  return (
    <VStack gap={16}>
      <Grid cols={3}>
        <Flex align="start">
          <Select
            desc="Дата"
            selected={dateSelected}
            onChange={setDateSelected}
            variant="clear"
            options={dateOptions}
          />
        </Flex>
        <Flex justify="center">
          <Text color="text-tertiary" align="center">
            Откуда — куда
          </Text>
        </Flex>
        <Flex justify="end">
          <Select
            desc="Стоимость"
            selected={priceSort}
            onChange={onPriceSortChange}
            variant="clear"
            options={priceOptions}
          />
        </Flex>
      </Grid>

      <RouteList
        routes={filteredRoutes || []}
        isLoading={isLoading || isFetching}
      />
    </VStack>
  );
};
