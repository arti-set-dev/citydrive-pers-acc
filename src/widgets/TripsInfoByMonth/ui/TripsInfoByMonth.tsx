import { useGetStatsQuery } from '@/entities/Employee';
import { getGrid } from '@/shared/lib/stack/grid/getGrid';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { TripsInfoByMonthSkeleton } from './TripsInfoByMonthSkeleton';

const stack = getGrid({
  cols: 3,
  gap: 16,
});

interface TripsInfoByMonthProps {
  employeeId: string;
  date?: string;
}

const monthNames: Record<string, string> = {
  '01': 'январе',
  '02': 'феврале',
  '03': 'марте',
  '04': 'апреле',
  '05': 'мае',
  '06': 'июне',
  '07': 'июле',
  '08': 'августе',
  '09': 'сентябре',
  '10': 'октябре',
  '11': 'ноябре',
  '12': 'декабре',
};

export const TripsInfoByMonth = ({
  employeeId,
  date,
}: TripsInfoByMonthProps) => {
  const { data: stats, isLoading } = useGetStatsQuery({ employeeId, date });

  if (isLoading) return <TripsInfoByMonthSkeleton />;

  const data = stats?.[0];

  if (!data)
    return (
      <Card p={24} variant="bg-outline" r={24}>
        <Text align="center" size={18}>
          Сатистика по данному сотруднику пока отсутвует
        </Text>
      </Card>
    );

  const monthLabel = monthNames[data.date.split('-')[1]] || data.date;
  return (
    <Card
      p={24}
      variant="bg-outline"
      r={24}
      className={stack.className}
      style={stack.style}
    >
      <VStack>
        <Text weight="bold" size={18}>
          {data.trips}
        </Text>
        <Text color="text-tertiary">поездок в {monthLabel}</Text>
      </VStack>
      <VStack>
        <Text weight="bold" size={18}>
          {data.spent.toLocaleString()} р
        </Text>
        <Text color="text-tertiary">потрачено в {monthLabel}</Text>
      </VStack>
      <VStack>
        <Text weight="bold" size={18}>
          {data.remaining.toLocaleString()} р
        </Text>
        <Text color="text-tertiary">осталось в {monthLabel}</Text>
      </VStack>
    </Card>
  );
};
