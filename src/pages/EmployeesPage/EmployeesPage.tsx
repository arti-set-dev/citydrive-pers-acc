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
    </Card>
  );
};

export default EmployeesPage;
