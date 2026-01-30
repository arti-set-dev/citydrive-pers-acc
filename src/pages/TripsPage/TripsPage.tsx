import { SearchEmployeeContainer } from '@/features/search-employee';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { useParams } from 'react-router-dom';

const stack = getVStack({
  gap: 16,
});

const TripsPage = () => {
  const { id } = useParams<{ id: string }>();

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
