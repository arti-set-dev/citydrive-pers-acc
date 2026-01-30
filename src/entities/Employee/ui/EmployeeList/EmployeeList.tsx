import { useMemo } from 'react';
import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { Card } from '@/shared/ui/Card/Card';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { Grid, HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';

import { Employee } from '../../model/types/employee';
import { useGetEmployeesListQuery } from '../../api/employeeApi';
import { getEmployeeData } from '../../model/selectors/employeeSelectors';
import { EmployeeItem } from '../EmployeeItem/EmployeeItem';
import { COLUMN_MAP } from '../../model/types/columns';

interface EmployeeListProps {
  activeKeys: Array<keyof Employee>;
  filters?: {
    name?: string;
    role?: string;
    departmentId?: string;
    status?: string;
  };
}

export const EmployeeList = ({ activeKeys, filters }: EmployeeListProps) => {
  const employeeData = useAppSelector(getEmployeeData);

  const {
    data: employees,
    isLoading,
    isFetching,
    isError,
  } = useGetEmployeesListQuery(
    {
      fields: activeKeys,
      companyId: employeeData?.companyId,
      name_like: filters?.name,
      role: filters?.role,
      departmentId: filters?.departmentId,
      status: filters?.status,
    },
    {
      skip: !employeeData?.companyId,
    },
  );

  const activeColumns = useMemo(() => {
    if (!employees?.length) return [];
    return Object.keys(COLUMN_MAP).filter(
      (key) =>
        key in employees[0] &&
        employees[0][key as keyof Employee] !== undefined,
    );
  }, [employees]);

  const gridCols = useMemo(() => {
    const count = activeColumns.length;
    return (count <= 6 ? count : 6) as 1 | 2 | 3 | 4 | 5 | 6 | 12;
  }, [activeColumns]);

  const directionStack = getFlex({ direction: 'column', gap: 16 });

  if (isLoading || isFetching) {
    return (
      <VStack gap={16}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} width="full" height={84} borderRadius={16} />
        ))}
      </VStack>
    );
  }

  if (isError) {
    return (
      <Text color="danger">
        Ошибка при загрузке сотрудников. Обратитесь в техподдержку
      </Text>
    );
  }

  if (!employees?.length) return <Text>Нет данных</Text>;

  return (
    <VStack>
      <Card p={0} isOverflowAuto>
        <Card
          p={0}
          className={directionStack.className}
          style={directionStack.style}
          minWidth={770}
        >
          {/* Шапка */}
          <Grid cols={gridCols}>
            {activeColumns.map((key) => {
              const config = COLUMN_MAP[key];
              const align = getFlex({ align: config.align || 'start' });
              return (
                <Card
                  key={key}
                  p={16}
                  color="text-tertiary"
                  borderLine="bottom"
                  className={align.className}
                  style={align.style}
                >
                  <Text color="text-tertiary">{config.header}</Text>
                </Card>
              );
            })}
          </Grid>

          {/* Данные */}
          {employees.map((item) => (
            <EmployeeItem
              key={item.id}
              item={item}
              activeColumns={activeColumns}
              columnMap={COLUMN_MAP}
              gridCols={gridCols}
            />
          ))}
        </Card>
      </Card>

      <HStack justify="space-between">
        <Pagination currentPage="3" totalPages={10} />
        <Text color="text-tertiary">1-50 из 883</Text>
      </HStack>
    </VStack>
  );
};
