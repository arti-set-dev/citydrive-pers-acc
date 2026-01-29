import { EmployeeList } from '@/entities/Employee';
import { SearchEmployeeForm } from '@/features/search-employee';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

const TripsPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" size={32} weight="bold">
        Поездки
      </Text>
      <SearchEmployeeForm />
      <EmployeeList
        activeKeys={['time', 'status', 'spent', 'name', 'email', 'phone']}
      />
    </Card>
  );
};

export default TripsPage;
