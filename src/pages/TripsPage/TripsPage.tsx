import { EmployeeList } from '@/entities/Employee';
// eslint-disable-next-line boundaries/entry-point
import { IEmployee } from '@/entities/Employee/ui/EmployeeList/EmployeeList';
import { SearchEmployeeForm } from '@/features/search-employee';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

const data: IEmployee[] = [
  {
    id: '1',
    lastTimeTrip: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
    status: 'active',
  },
  {
    id: '2',
    lastTimeTrip: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
    status: 'active',
  },
  {
    id: '3',
    lastTimeTrip: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
    status: 'active',
  },
  {
    id: '4',
    lastTimeTrip: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
    status: 'active',
  },
  {
    id: '5',
    lastTimeTrip: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
    status: 'active',
  },
  {
    id: '6',
    lastTimeTrip: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
    status: 'inactive',
  },
];

const TripsPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" size={32} weight="bold">
        Поездки
      </Text>
      <SearchEmployeeForm />
      <EmployeeList data={data} />
    </Card>
  );
};

export default TripsPage;
