import { EmployeesFilter } from '@/features/employees-filter';
import { PATHS } from '@citydrive/shared/lib/router/paths';
import { getVStack } from '@citydrive/shared/lib/stack/flex/getVStack';
import { AppLink } from '@citydrive/shared/ui/AppLink/AppLink';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { HStack } from '@citydrive/shared/ui/Stack';
import { Text } from '@citydrive/shared/ui/Text/Text';

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
        <AppLink
          variant="outline"
          to={PATHS.employees + '/new'}
          data-testid="add-employee-btn"
        >
          Добавить сотрудника
        </AppLink>
      </HStack>
      <EmployeesFilter />
    </Card>
  );
};

export default EmployeesPage;
