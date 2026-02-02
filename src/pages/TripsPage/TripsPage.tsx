import { getEmployeeData } from '@/entities/Employee';
import { SearchEmployeeContainer } from '@/features/search-employee';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

const TripsPage = () => {
  const employeeData = useAppSelector(getEmployeeData);
  const id = employeeData?.departmentId;

  if (!id) return <Text color="danger">Отдел не найден</Text>;
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" size={32} weight="bold">
        Поездки
      </Text>
      <SearchEmployeeContainer departmentId={id} />
    </Card>
  );
};

export default TripsPage;
