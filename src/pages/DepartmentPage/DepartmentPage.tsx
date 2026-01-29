import { SearchEmployeeForm } from '@/features/search-employee';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { getRouteDepartmentEdit } from '@/shared/lib/router/paths';

const stack = getVStack({
  gap: 16,
});

const DepartmentPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <HStack justify="space-between">
        <Text as="h1" size={{ base: 32, sm: 20 }} weight="bold">
          Финансовый отдел
        </Text>
        <AppLink to={getRouteDepartmentEdit('1')} variant="outline">
          Редактировать
        </AppLink>
      </HStack>
      <SearchEmployeeForm />
      {/* <EmployeeList data={data} /> */}
    </Card>
  );
};

export default DepartmentPage;
