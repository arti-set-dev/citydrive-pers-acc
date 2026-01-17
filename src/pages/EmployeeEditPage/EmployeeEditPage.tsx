import { EditEmployeeForm } from '@/features/edit-employee';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { useParams } from 'react-router-dom';

const stack = getVStack({
  gap: 16,
});

const EmployeeEditPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" weight="bold" size={32}>
        Редактировать информацмю о сотруднике {id}
      </Text>
      <EditEmployeeForm />
    </Card>
  );
};

export default EmployeeEditPage;
