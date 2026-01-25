import { getEmployeeData } from '@/entities/Employee';
import { InvoiceList } from '@/entities/Invoice';
import { SearchInvoicesForm } from '@/features/search-invoices';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

const InvoicesPage = () => {
  const employeeData = useAppSelector(getEmployeeData);
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" weight="bold" size={32}>
        Счета
      </Text>
      <SearchInvoicesForm />
      <InvoiceList employeeID={employeeData?.id} />
    </Card>
  );
};

export default InvoicesPage;
