import { DepartmentList } from '@/entities/Department';
import { SearchDepartmentForm } from '@/features/search-department';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

const DepartmentsPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <HStack justify="space-between">
        <Text as="h1" size={32} weight="bold">
          Отделы
        </Text>
        <AppLink to="" variant="outline">
          Добавить отдел
        </AppLink>
      </HStack>
      <SearchDepartmentForm />
      <DepartmentList />
      <HStack justify="space-between">
        <Pagination currentPage="3" totalPages={10} />
        <Text color="text-tertiary">1-50 из 883</Text>
      </HStack>
    </Card>
  );
};

export default DepartmentsPage;
