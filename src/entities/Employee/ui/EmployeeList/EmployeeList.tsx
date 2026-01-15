import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { Card } from '@/shared/ui/Card/Card';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { Grid, HStack, VStack } from '@/shared/ui/Stack';
import { Status } from '@/shared/ui/Status/Status';
import { Text } from '@/shared/ui/Text/Text';
import React from 'react';

type StatusEmployee = 'active' | 'inactive';

export interface IEmployee {
  id: string;
  lastTimeTrip?: string;
  name: string;
  email?: string;
  phone?: string;
  price?: string;
  status?: StatusEmployee;
  role?: string;
  spent?: string;
  monthLimit?: string;
  department?: string;
}

interface EmployeeListProps {
  data: IEmployee[];
}

const COLUMN_MAP: Record<
  string,
  {
    header: string;
    render: (item: IEmployee) => React.ReactNode;
    align?: 'start' | 'end';
  }
> = {
  lastTimeTrip: {
    header: 'Время',
    render: (item) => (
      <HStack gap={8}>
        {item.status && <Status status={item.status} />}

        <Text>{item.lastTimeTrip}</Text>
      </HStack>
    ),
  },
  name: {
    header: 'Сотрудник',
    render: (item) => (
      <HStack gap={8}>
        {item.status && <Status status={item.status} />}

        <VStack gap={4}>
          <Text>{item.name}</Text>
          {item.email && (
            <Text color="text-tertiary" size={14}>
              {item.email}
            </Text>
          )}
        </VStack>
      </HStack>
    ),
  },
  phone: {
    header: 'Телефон',
    render: (item) => <Text>{item.phone}</Text>,
  },
  role: {
    header: 'Роль',
    render: (item) => <Text>{item.role}</Text>,
  },
  department: {
    header: 'Отдел',
    render: (item) => <Text>{item.department}</Text>,
  },
  monthLimit: {
    header: 'Лимит',
    render: (item) => <Text>{item.monthLimit}</Text>,
  },
  spent: {
    header: 'Потрачено',
    render: (item) => <Text>{item.spent}</Text>,
    align: 'end',
  },
  price: {
    header: 'Стоимость',
    align: 'end',
    render: (item) => <Text>{item.price}</Text>,
  },
};

export const EmployeeList = ({ data }: EmployeeListProps) => {
  if (!data.length) return <Text>Нет данных</Text>;

  const activeColumns = Object.keys(COLUMN_MAP).filter(
    (key) => key in data[0] && data[0][key as keyof IEmployee] !== undefined,
  );

  const colsCount = activeColumns.length;
  const gridCols = (colsCount <= 6 ? colsCount : 6) as
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 12;

  const directionStack = getFlex({ direction: 'column', gap: 16 });
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
          <Grid cols={gridCols}>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {activeColumns.map((key) => {
                  const config = COLUMN_MAP[key];
                  const align = getFlex({ align: config.align || 'start' });
                  return (
                    <Card
                      key={key + item.id}
                      p={16}
                      borderLine="bottom"
                      className={align.className}
                      style={align.style}
                    >
                      {config.render(item)}
                    </Card>
                  );
                })}
              </React.Fragment>
            ))}
          </Grid>
        </Card>
      </Card>
      <HStack justify="space-between">
        <Pagination currentPage="3" totalPages={10} />
        <Text color="text-tertiary">1-50 из 883</Text>
      </HStack>
    </VStack>
  );
};
