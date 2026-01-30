import { HStack, VStack } from '@/shared/ui/Stack';
import { InvoiceItem } from '../InvoiceItem/InvoiceItem';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { Text } from '@/shared/ui/Text/Text';
import { useGetInvoicesQuery } from '../../api/invoiceApi';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface InvoiceListProps {
  targetIds: string[];
  search?: string;
}

export const InvoiceList = ({ targetIds, search }: InvoiceListProps) => {
  const {
    data: invoices,
    isLoading,
    isFetching,
    isError,
  } = useGetInvoicesQuery(
    { targetIds, search },
    { skip: targetIds.length === 0 },
  );

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
        Ошибка при загрузке счетов. Обратитесь в техподдержку
      </Text>
    );
  }
  if (!invoices || invoices.length === 0) {
    return (
      <Text align="center">
        {search
          ? `По вашему запросу "${search}" счетов с таким названием не найдено`
          : 'Сейчас никаких счетов нет'}
      </Text>
    );
  }
  return (
    <VStack>
      <VStack>
        {invoices?.map((invoice) => (
          <InvoiceItem key={invoice.id} invoice={invoice} />
        ))}
      </VStack>
      <HStack justify="space-between">
        <Pagination currentPage="3" totalPages={10} />
        <Text color="text-tertiary">1-50 из 883</Text>
      </HStack>
    </VStack>
  );
};
