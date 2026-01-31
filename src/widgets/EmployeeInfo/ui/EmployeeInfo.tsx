import { useGetEmployeeDataQuery } from '@/entities/Employee';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Flex, Grid } from '@/shared/ui/Stack';
import { Status } from '@/shared/ui/Status/Status';
import { Text } from '@/shared/ui/Text/Text';
import { EmployeeInfoSkeleton } from './EmployeeInfoSkeleton';
import {
  mapCars,
  mapCities,
  mapDays,
} from '@/shared/lib/mapEmployeeData/mapEmployeeData';

const stack = getVStack({
  gap: 16,
});

export const EmployeeInfo = ({ id }: { id: string }) => {
  const { data: employee, isLoading } = useGetEmployeeDataQuery(id);

  if (isLoading) return <EmployeeInfoSkeleton />;
  if (!employee) return null;
  return (
    <Card
      p={24}
      r={24}
      variant="bg-outline"
      className={stack.className}
      style={stack.style}
    >
      <Text as="h2" weight="bold" size={24}>
        Данные сотрудника
      </Text>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Статус
        </Text>
        <Flex align="center" direction={{ base: 'row', lg: 'row' }} gap={16}>
          <Text>{employee.status === 'active' ? 'Активен' : 'Неактивен'}</Text>
          <Status status={employee.status ?? 'inactive'} />
        </Flex>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Телефон
        </Text>
        <Text>{employee.phone}</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Email
        </Text>
        <Text>{employee.email}</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Роль
        </Text>
        <Text>{employee.role}</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Отдел
        </Text>
        <Text>{employee.department}</Text>
      </Grid>
      <Text as="h2" weight="bold" size={24}>
        Личный лимит
      </Text>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Лимит
        </Text>
        <Text>{employee.limit} р/мес</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Потрачено
        </Text>
        <Text>{employee.spent} р</Text>
      </Grid>
      <Text as="h2" weight="bold" size={24}>
        Личные настройки доступа
      </Text>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Время
        </Text>
        <Text>
          с {employee.time.start} до {employee.time.end}
        </Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Дни
        </Text>
        <Text>{mapDays(employee.days)}</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Машины
        </Text>
        <Text>{mapCars(employee.cars)}</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Город
        </Text>
        <Text>{mapCities(employee.city)}</Text>
      </Grid>
    </Card>
  );
};
