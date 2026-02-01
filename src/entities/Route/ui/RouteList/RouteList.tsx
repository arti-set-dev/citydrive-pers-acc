import { useSearchParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { VirtualList } from '@/shared/ui/VirtualList/VirtualList';
import { Pagination } from '@/shared/ui/Pagination/Pagination';

import {
  GetRoutesArgs,
  RouteArrayResponse,
  useGetRoutesQuery,
} from '../../api/routeApi';
import { RouteItemSkeleton } from '../RouteItem/RouteItemSkeleton';
import { SmartRouteItem } from '../SmartRouteItem/SmartRouteItem';
import { useEffect, useState } from 'react';

export interface RouteListProps {
  employeeId: string;
  filters?: Pick<GetRoutesArgs, 'date' | 'sort' | 'startDate' | 'endDate'>;
}

const LIMIT = 3;

export const RouteList = ({ employeeId, filters }: RouteListProps) => {
  const [searchParams] = useSearchParams();
  const [mobilePage, setMobilePage] = useState(1);

  const desktopPage = Number(searchParams.get('page')) || 1;
  const currentPage = isMobile ? mobilePage : desktopPage;

  useEffect(() => {
    setMobilePage(1);
  }, [filters, employeeId]);

  const {
    data: routes,
    isLoading,
    isFetching,
  } = useGetRoutesQuery(
    {
      employeeId,
      ...filters,
      _page: currentPage,
      _limit: LIMIT,
      isMobile,
    },
    { skip: !employeeId },
  );

  const totalCount = (routes as RouteArrayResponse)?.totalCount || 0;
  const totalPages = (routes as RouteArrayResponse)?.totalPages || 1;
  const isEmpty = !routes || routes.length === 0;

  const handleLoadMore = () => {
    if (routes && routes.length < totalCount && !isFetching) {
      setMobilePage((prev) => prev + 1);
    }
  };

  if (isLoading && !routes) {
    return (
      <VStack gap={8}>
        {[...Array(3)].map((_, i) => (
          <RouteItemSkeleton key={i} />
        ))}
      </VStack>
    );
  }

  if (isEmpty && !isFetching) {
    return (
      <Text color="text-tertiary" align="center">
        Поездок не найдено
      </Text>
    );
  }

  const showDesktopSkeleton = !isMobile && isFetching;

  const renderContent = isMobile ? (
    <VirtualList
      height="308px"
      items={routes || []}
      skeletonComponent={<RouteItemSkeleton />}
      isFetching={isFetching}
      onLoadMore={handleLoadMore}
      renderItem={(route) => (
        <VStack gap={8} key={route.id} style={{ marginBottom: '12px' }}>
          <SmartRouteItem route={route} />
        </VStack>
      )}
    />
  ) : (
    <VStack gap={16}>
      {showDesktopSkeleton ? (
        <VStack gap={8}>
          {[...Array(4)].map((_, i) => (
            <RouteItemSkeleton key={i} />
          ))}
        </VStack>
      ) : (
        <>
          <VStack gap={8}>
            {routes?.map((route) => (
              <SmartRouteItem key={route.id} route={route} />
            ))}
          </VStack>
          {!isEmpty && (
            <HStack justify="space-between" align="center">
              <Pagination currentPage={desktopPage} totalPages={totalPages} />
              <Text color="text-tertiary" size={14}>
                {`${(desktopPage - 1) * LIMIT + 1}-${Math.min(desktopPage * LIMIT, totalCount)} из ${totalCount}`}
              </Text>
            </HStack>
          )}
        </>
      )}
    </VStack>
  );

  return <VStack>{renderContent}</VStack>;
};
