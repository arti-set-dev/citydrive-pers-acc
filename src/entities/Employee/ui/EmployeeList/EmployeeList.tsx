import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { Card } from '@/shared/ui/Card/Card';
import { Grid, HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { VirtualList } from '@/shared/ui/VirtualList/VirtualList';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';

import { Employee } from '../../model/types/employee';
import {
  useGetEmployeesListQuery,
  EmployeeArrayResponse,
} from '../../api/employeeApi';
import { getEmployeeData } from '../../model/selectors/employeeSelectors';
import { EmployeeItem } from '../EmployeeItem/EmployeeItem';
import { COLUMN_MAP } from '../../model/types/columns';

interface EmployeeListProps {
  activeKeys: Array<keyof Employee>;
  filters?: {
    name?: string;
    role?: string;
    departmentId?: string;
    status?: string;
  };
}

const LIMIT = 10;

export const EmployeeList = ({ activeKeys, filters }: EmployeeListProps) => {
  const [searchParams] = useSearchParams();
  const [mobilePage, setMobilePage] = useState(1);
  const employeeData = useAppSelector(getEmployeeData);

  const desktopPage = Number(searchParams.get('page')) || 1;
  const currentPage = isMobile ? mobilePage : desktopPage;

  useEffect(() => {
    setMobilePage(1);
  }, [filters]);

  const {
    data: employees,
    isLoading,
    isFetching,
    isError,
  } = useGetEmployeesListQuery(
    {
      fields: activeKeys,
      companyId: employeeData?.companyId,
      name_like: filters?.name,
      role: filters?.role,
      departmentId: filters?.departmentId,
      status: filters?.status,
      _page: currentPage,
      _limit: LIMIT,
      isMobile,
    },
    {
      skip: !employeeData?.companyId,
    },
  );

  const totalPages = (employees as EmployeeArrayResponse)?.totalPages || 1;
  const totalCount = (employees as EmployeeArrayResponse)?.totalCount || 0;
  const isEmpty = employees?.length === 0;

  const activeColumns = useMemo(() => {
    return Object.keys(COLUMN_MAP).filter((key) =>
      activeKeys.includes(key as keyof Employee),
    );
  }, [activeKeys]);

  const gridCols = useMemo(() => {
    const count = activeColumns.length;
    return (count <= 6 ? count : 6) as 1 | 2 | 3 | 4 | 5 | 6 | 12;
  }, [activeColumns]);

  const handleLoadMore = () => {
    if (employees && employees.length < totalCount && !isFetching) {
      setMobilePage((prev) => prev + 1);
    }
  };

  if (isLoading && !employees) {
    return (
      <VStack gap={16}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} width="full" height={84} borderRadius={16} />
        ))}
      </VStack>
    );
  }

  if (isError) {
    return <Text color="danger">Ошибка при загрузке сотрудников.</Text>;
  }

  const showDesktopSkeleton = !isMobile && isFetching;

  const renderContent = isMobile ? (
    <VirtualList
      height="65vh"
      items={employees || []}
      isLoading={isLoading}
      skeletonComponent={
        <Skeleton width="full" height={84} borderRadius={16} />
      }
      isFetching={isFetching}
      onLoadMore={handleLoadMore}
      renderItem={(item) => (
        <VStack gap={16} key={item.id}>
          <EmployeeItem
            item={item}
            activeColumns={activeColumns}
            columnMap={COLUMN_MAP}
            gridCols={gridCols}
          />
        </VStack>
      )}
      emptyComponent={<Text>Сотрудники не найдены</Text>}
    />
  ) : (
    <VStack gap={16}>
      <VStack gap={0}>
        {showDesktopSkeleton ? (
          <VStack gap={16}>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} width="full" height={60} />
            ))}
          </VStack>
        ) : (
          <>
            {employees?.map((item) => (
              <EmployeeItem
                key={item.id}
                item={item}
                activeColumns={activeColumns}
                columnMap={COLUMN_MAP}
                gridCols={gridCols}
              />
            ))}

            {isEmpty && <Text>Нет данных</Text>}
          </>
        )}
      </VStack>
      {!isEmpty && (
        <HStack justify="space-between">
          <Pagination currentPage={desktopPage} totalPages={totalPages} />
          <Text color="text-tertiary" size={14}>
            {`${(desktopPage - 1) * LIMIT + 1}-${Math.min(desktopPage * LIMIT, totalCount)} из ${totalCount}`}
          </Text>
        </HStack>
      )}
    </VStack>
  );

  return (
    <Card p={0} isOverflowAuto>
      <Card p={0} minWidth={770}>
        {!isMobile && (
          <Grid cols={gridCols}>
            {activeColumns.map((key) => (
              <Card key={key} p={16} borderLine="bottom">
                <Text color="text-tertiary" weight="medium">
                  {COLUMN_MAP[key].header}
                </Text>
              </Card>
            ))}
          </Grid>
        )}
        {renderContent}
      </Card>
    </Card>
  );
};
