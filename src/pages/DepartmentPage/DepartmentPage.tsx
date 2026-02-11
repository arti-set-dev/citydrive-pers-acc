import { SearchEmployeeContainer } from '@/features/search-employee';
import { getVStack } from '@citydrive/shared/lib/stack/flex/getVStack';
import { AppLink } from '@citydrive/shared/ui/AppLink/AppLink';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { HStack } from '@citydrive/shared/ui/Stack';
import { Text } from '@citydrive/shared/ui/Text/Text';
import { getRouteDepartmentEdit } from '@citydrive/shared/lib/router/paths';
import { useParams } from 'react-router-dom';
import { useGetDepartmentByIdQuery } from '@citydrive/entities/Department';
import { Skeleton } from '@citydrive/shared/ui/Skeleton/Skeleton';

const stack = getVStack({
  gap: 16,
});

const DepartmentPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: department, isLoading } = useGetDepartmentByIdQuery(id ?? '');

  if (!id) return <Text color="danger">Отдел не найден</Text>;

  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <HStack justify="space-between">
        {isLoading ? (
          <Skeleton width={300} height={32} borderRadius={10} />
        ) : (
          <Text as="h1" size={{ base: 32, sm: 20 }} weight="bold">
            {department?.name}
          </Text>
        )}

        <AppLink to={getRouteDepartmentEdit(id)} variant="outline">
          Редактировать
        </AppLink>
      </HStack>
      <SearchEmployeeContainer departmentId={id} />
    </Card>
  );
};

export default DepartmentPage;
