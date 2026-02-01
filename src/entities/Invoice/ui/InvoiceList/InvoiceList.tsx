import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { VirtualList } from '@/shared/ui/VirtualList/VirtualList';
import { Pagination } from '@/shared/ui/Pagination/Pagination';

import { InvoiceItem } from '../InvoiceItem/InvoiceItem';
import {
  useGetInvoicesQuery,
  InvoiceArrayResponse,
} from '../../api/invoiceApi';

interface InvoiceListProps {
  targetIds?: string[];
  companyId?: string;
  search?: string;
}

const LIMIT = 10;

export const InvoiceList = ({
  targetIds,
  companyId,
  search,
}: InvoiceListProps) => {
  const [searchParams] = useSearchParams();
  const [mobilePage, setMobilePage] = useState(1);

  const desktopPage = Number(searchParams.get('page')) || 1;
  const currentPage = isMobile ? mobilePage : desktopPage;

  useEffect(() => {
    setMobilePage(1);
  }, [search, targetIds]);

  const {
    data: invoices,
    isLoading,
    isFetching,
    isError,
  } = useGetInvoicesQuery(
    {
      targetIds,
      companyId,
      search,
      _page: currentPage,
      _limit: LIMIT,
      isMobile,
    },
    { skip: (!targetIds || targetIds.length === 0) && !companyId },
  );

  const totalPages = (invoices as InvoiceArrayResponse)?.totalPages || 1;
  const totalCount = (invoices as InvoiceArrayResponse)?.totalCount || 0;
  const isEmpty = !invoices || invoices.length === 0;

  const handleLoadMore = () => {
    if (invoices && invoices.length < totalCount && !isFetching) {
      setMobilePage((prev) => prev + 1);
    }
  };

  if (isLoading && !invoices) {
    return (
      <VStack gap={16}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} width="full" height={84} borderRadius={16} />
        ))}
      </VStack>
    );
  }

  if (isError) {
    return <Text color="danger">Ошибка при загрузке счетов.</Text>;
  }

  const showDesktopSkeleton = !isMobile && isFetching;

  const renderContent = isMobile ? (
    <VirtualList
      height="70vh"
      items={invoices || []}
      skeletonComponent={
        <Skeleton width="full" height={84} borderRadius={16} />
      }
      isLoading={isLoading}
      isFetching={isFetching}
      onLoadMore={handleLoadMore}
      renderItem={(invoice) => (
        <VStack gap={16} key={invoice.id} style={{ marginBottom: '12px' }}>
          <InvoiceItem invoice={invoice} />
        </VStack>
      )}
      emptyComponent={
        <Text align="center">
          {search ? `Ничего не найдено по запросу "${search}"` : 'Счетов нет'}
        </Text>
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
          <VStack gap={16}>
            {invoices?.map((invoice) => (
              <InvoiceItem key={invoice.id} invoice={invoice} />
            ))}
            {isEmpty && <Text align="center">Список счетов пуст</Text>}
          </VStack>

          {!isEmpty && (
            <HStack justify="space-between">
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
