import { Flex, Grid, VStack } from '@/shared/ui/Stack';
import { DepartmentItem } from '../DepartmentItem/DepartmentItem';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { useGetDepartmentsQuery } from '../../api/departmentApi';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Department } from '../../model/types/department';

export const DepartmentList = ({
  companyId,
  search,
  renderActions,
}: {
  companyId?: string;
  search?: string;
  renderActions?: (department: Department) => React.ReactNode;
}) => {
  const {
    data: departments,
    isLoading,
    isFetching,
    isError,
  } = useGetDepartmentsQuery({ companyId, name: search }, { skip: !companyId });

  if (isLoading || isFetching) {
    return (
      <VStack gap={16}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} width="full" height={84} borderRadius={16} />
        ))}
      </VStack>
    );
  }
  if (isError) {
    return (
      <Text color="danger">
        Ошибка при загрузке отделов. Обратитесь в техподдержку
      </Text>
    );
  }
  return (
    <Card p={0} isOverflowAuto>
      <Card minWidth={770}>
        <VStack>
          <Grid cols={5}>
            <Card p={16}>
              <Text color="text-tertiary" weight="medium" size={18}>
                Название отдела
              </Text>
            </Card>
            <Card p={16}>
              <Text color="text-tertiary" weight="medium" size={18}>
                Сотруники
              </Text>
            </Card>
            <Card p={16}>
              <Text color="text-tertiary" weight="medium" size={18}>
                Лимит р/мес.
              </Text>
            </Card>
            <Card p={16}>
              <Text color="text-tertiary" weight="medium" size={18}>
                Траты за месяц
              </Text>
            </Card>
            <Card p={16}>
              <Flex align="end">
                <Text color="text-tertiary" weight="medium" size={18}>
                  Отдел продаж
                </Text>
              </Flex>
            </Card>
          </Grid>
        </VStack>
        <VStack gap={0}>
          {departments?.map((department) => (
            <DepartmentItem
              key={department.id}
              department={department}
              actions={renderActions?.(department)}
            />
          ))}

          {departments?.length === 0 && (
            <Card p={16}>
              <Text>
                {search
                  ? 'По вашему запросу отделов с таким названием не найдено'
                  : 'Отделы еще не созданы'}
              </Text>
            </Card>
          )}
        </VStack>
      </Card>
    </Card>
  );
};
