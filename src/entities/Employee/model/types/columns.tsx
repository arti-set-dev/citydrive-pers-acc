import { HStack, VStack } from '@/shared/ui/Stack';
import { Employee } from './employee';
import { Status } from '@/shared/ui/Status/Status';
import { Text } from '@/shared/ui/Text/Text';

export const COLUMN_MAP: Record<
  string,
  {
    header: string;
    render: (item: Partial<Employee>) => React.ReactNode;
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
  limit: {
    header: 'Лимит',
    render: (item) => <Text>{item.limit} р</Text>,
  },
  spent: {
    header: 'Потрачено',
    render: (item) => <Text>{item.spent} р</Text>,
    align: 'end',
  },
};
