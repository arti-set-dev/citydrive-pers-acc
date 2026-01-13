import { EmployeeList } from '@/entities/Employee';
// eslint-disable-next-line boundaries/entry-point
import type { IEmployee } from '@/entities/Employee/ui/EmployeeList/EmployeeList';
import { EmployeesFilter } from '@/features/employees-filter';
import { PATHS } from '@/shared/lib/router/paths';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

const data: IEmployee[] = [
  {
    id: '1',
    name: 'Константин Герман Феликсовыич',
    status: 'active',
    role: 'Администратор',
    department: 'Отдел продаж',
    spent: '2000 р',
    monthLimit: '100 000 р',
  },
  {
    id: '2',
    name: 'Константин Герман Феликсовыич',
    status: 'active',
    role: 'Менеджер',
    department: 'Отдел продаж',
    spent: '2000 р',
    monthLimit: '100 000 р',
  },
  {
    id: '3',
    name: 'Константин Герман Феликсовыич',
    status: 'active',
    role: 'Сотрудник',
    department: 'Отдел продаж',
    spent: '2000 р',
    monthLimit: '100 000 р',
  },
  {
    id: '4',
    name: 'Константин Герман Феликсовыич',
    status: 'active',
    role: 'Администратор',
    department: 'Отдел продаж',
    spent: '2000 р',
    monthLimit: '100 000 р',
  },
  {
    id: '5',
    name: 'Константин Герман Феликсовыич',
    status: 'active',
    role: 'Администратор',
    department: 'Отдел продаж',
    spent: '2000 р',
    monthLimit: '100 000 р',
  },
  {
    id: '6',
    name: 'Константин Герман Феликсовыич',
    status: 'inactive',
    role: 'Администратор',
    department: 'Отдел продаж',
    spent: '2000 р',
    monthLimit: '100 000 р',
  },
];

const EmployeesPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <HStack justify="space-between">
        <Text as="h1" size={{ base: 32, sm: 20 }} weight="bold">
          Сотрудники
        </Text>
        <AppLink variant="outline" to={PATHS.employees + '/new'}>
          Добавить сотрудника
        </AppLink>
      </HStack>
      <EmployeesFilter />
      <EmployeeList data={data} />
    </Card>
  );
};

export default EmployeesPage;
