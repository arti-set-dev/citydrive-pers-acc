import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Grid, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { VirtualList } from '@/shared/ui/VirtualList/VirtualList';
import { Pagination } from '@/shared/ui/Pagination/Pagination';

import { DepartmentItem } from '../DepartmentItem/DepartmentItem';
import {
  DepartmentArrayResponse,
  useGetDepartmentsQuery,
} from '../../api/departmentApi';
import { Department } from '../../model/types/department';

const LIMIT = 10;

export const DepartmentList = ({
  companyId,
  search,
  renderActions,
}: {
  companyId?: string;
  search?: string;
  renderActions?: (department: Department) => React.ReactNode;
}) => {
  const [searchParams] = useSearchParams();
  const [mobilePage, setMobilePage] = useState(1);

  const desktopPage = Number(searchParams.get('page')) || 1;
  const currentPage = isMobile ? mobilePage : desktopPage;

  useEffect(() => {
    setMobilePage(1);
  }, [search]);

  const {
    data: departments,
    isLoading,
    isFetching,
    isError,
  } = useGetDepartmentsQuery(
    {
      companyId,
      name: search,
      _page: currentPage,
      _limit: LIMIT,
      isMobile,
    },
    { skip: !companyId },
  );

  const isEmpty = departments?.length === 0;
  const totalPages = (departments as DepartmentArrayResponse)?.totalPages || 1;
  const showDesktopSkeleton = !isMobile && isFetching;

  const handleLoadMore = () => {
    const currentTotal =
      (departments as DepartmentArrayResponse)?.totalCount || 0;
    if (departments && departments.length < currentTotal && !isFetching) {
      setMobilePage((prev) => prev + 1);
    }
  };

  if (isLoading && !departments) {
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
      <Text color="danger">Ошибка загрузки. Попробуйте обновить страницу.</Text>
    );
  }

  const renderContent = isMobile ? (
    <VirtualList
      height="65vh"
      items={departments || []}
      isLoading={isLoading}
      skeletonComponent={
        <Skeleton width="full" height={84} borderRadius={16} />
      }
      isFetching={isFetching}
      onLoadMore={handleLoadMore}
      renderItem={(department) => (
        <VStack gap={16} key={department.id} style={{ marginBottom: '16px' }}>
          <DepartmentItem
            department={department}
            actions={renderActions?.(department)}
          />
        </VStack>
      )}
      emptyComponent={
        <Card p={16}>
          <Text>{search ? 'Ничего не найдено' : 'Список пуст'}</Text>
        </Card>
      }
    />
  ) : (
    <VStack gap={16}>
      {showDesktopSkeleton ? (
        <VStack gap={16}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} width="full" height={84} borderRadius={16} />
          ))}
        </VStack>
      ) : (
        <>
          <VStack gap={0}>
            {departments?.map((department) => (
              <DepartmentItem
                key={department.id}
                department={department}
                actions={renderActions?.(department)}
              />
            ))}

            {isEmpty && (
              <Card p={16}>
                <Text>
                  {search ? 'Ничего не найдено' : 'Отделы еще не созданы'}
                </Text>
              </Card>
            )}
          </VStack>

          {!isEmpty && (
            <Pagination currentPage={desktopPage} totalPages={totalPages} />
          )}
        </>
      )}
    </VStack>
  );

  return (
    <Card p={0} isOverflowAuto>
      <Card minWidth={770}>
        <VStack gap={16}>
          <VStack gap={0}>
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
            </Grid>
            {renderContent}
          </VStack>
        </VStack>
      </Card>
    </Card>
  );
};
