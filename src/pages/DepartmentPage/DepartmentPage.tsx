import { SearchEmployeeContainer } from '@/features/search-employee';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { getRouteDepartmentEdit } from '@/shared/lib/router/paths';
import { useParams } from 'react-router-dom';
import { useGetDepartmentByIdQuery } from '@/entities/Department';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

const stack = getVStack({
  gap: 16,
});

const DepartmentPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <Text color="danger">Отдел не найден</Text>;

  const { data: department, isLoading } = useGetDepartmentByIdQuery(id);
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
