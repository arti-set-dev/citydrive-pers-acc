import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useGetRoutesQuery } from '@/entities/Route';
import { SortTripsByMonth } from '../SortTripsByMonth/SortTripsByMonth';
import { TripsFilter } from '../TripsFilter/TripsFilter';
import { VStack } from '@/shared/ui/Stack';

interface TripsSortContainerProps {
  employeeId: string;
}

interface SelectOption {
  id: number | string;
  name: string;
}

export const TripsSortContainer = ({ employeeId }: TripsSortContainerProps) => {
  const [range, setRange] = useState<DateRange | undefined>();

  const [priceSort, setPriceSort] = useState<SelectOption | null>(null);

  const { data: allRoutes } = useGetRoutesQuery({ employeeId });

  const firstTripDate = useMemo(() => {
    if (!allRoutes || !allRoutes.length) return undefined;
    const dates = allRoutes
      .map((r) => new Date(r.date))
      .sort((a, b) => a.getTime() - b.getTime());
    return dates[0];
  }, [allRoutes]);

  return (
    <VStack gap={24}>
      <SortTripsByMonth
        value={range}
        onChange={setRange}
        minDate={firstTripDate}
      />
      <TripsFilter
        employeeId={employeeId}
        dateRange={range}
        onPriceSortChange={setPriceSort}
        priceSort={priceSort}
      />
    </VStack>
  );
};
