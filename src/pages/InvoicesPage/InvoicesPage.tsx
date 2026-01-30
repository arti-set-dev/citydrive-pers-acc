import { getEmployeeData } from '@/entities/Employee';
import { useGetCompanyEmployeesQuery } from '@/features/import-data-about-company';
import { SearchInvoicesContainer } from '@/features/search-invoices';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { useMemo } from 'react';

const stack = getVStack({
  gap: 16,
});

const InvoicesPage = () => {
  const employeeData = useAppSelector(getEmployeeData);
  const { data: colleagues } = useGetCompanyEmployeesQuery(
    employeeData?.companyId ?? '',
    {
      skip: employeeData?.role !== 'admin',
    },
  );

  const targetIds = useMemo(() => {
    if (employeeData?.role === 'admin' && colleagues) {
      return colleagues.map((emp) => emp.id);
    }
    return employeeData?.id ? [employeeData.id] : [];
  }, [employeeData, colleagues]);
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" weight="bold" size={32}>
        Счета
      </Text>
      <SearchInvoicesContainer targetIds={targetIds} />
    </Card>
  );
};

export default InvoicesPage;
