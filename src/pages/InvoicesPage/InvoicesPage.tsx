import { useMemo } from 'react';
import { getEmployeeData } from '@citydrive/entities/Employee';
import { SearchInvoicesContainer } from '@/features/search-invoices';
import { useAppSelector } from '@citydrive/shared/hooks/useAppSelector/useAppSelector';
import { getVStack } from '@citydrive/shared/lib/stack/flex/getVStack';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { Text } from '@citydrive/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

const InvoicesPage = () => {
  const employeeData = useAppSelector(getEmployeeData);

  const { targetIds, companyId } = useMemo(() => {
    const isAdmin = employeeData?.role === 'admin';
    const hasCompany = !!employeeData?.companyId;

    if (isAdmin && hasCompany) {
      return {
        companyId: employeeData.companyId,
        targetIds: undefined,
      };
    }

    return {
      targetIds: employeeData?.id ? [employeeData.id] : [],
      companyId: undefined,
    };
  }, [employeeData]);

  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" weight="bold" size={32}>
        Счета
      </Text>
      <SearchInvoicesContainer targetIds={targetIds} companyId={companyId} />
    </Card>
  );
};

export default InvoicesPage;
