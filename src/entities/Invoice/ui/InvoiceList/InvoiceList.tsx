import { HStack, VStack } from '@/shared/ui/Stack';
import { InvoiceItem } from '../InvoiceItem/InvoiceItem';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { Text } from '@/shared/ui/Text/Text';

export const InvoiceList = () => {
  return (
    <VStack>
      <VStack>
        <InvoiceItem />
        <InvoiceItem />
        <InvoiceItem />
        <InvoiceItem />
      </VStack>
      <HStack justify="space-between">
        <Pagination currentPage="3" totalPages={10} />
        <Text color="text-tertiary">1-50 из 883</Text>
      </HStack>
    </VStack>
  );
};
