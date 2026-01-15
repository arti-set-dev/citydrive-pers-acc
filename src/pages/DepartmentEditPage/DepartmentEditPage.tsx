import { EditDepartmentForm } from '@/features/edit-department';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { useParams } from 'react-router-dom';

const stack = getVStack({
  gap: 16,
});

const DepartmentEditPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Card borderLine="bottom">
        <Text as="h1" weight="bold" size={32}>
          Редактирование отдела {id}
        </Text>
      </Card>

      <EditDepartmentForm />
    </Card>
  );
};

export default DepartmentEditPage;
