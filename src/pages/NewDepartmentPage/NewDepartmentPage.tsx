import { AddNewDepartmentForm } from '@/features/add-new-department';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

const NewDepartmentPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Card borderLine="bottom">
        <Text as="h1" weight="bold" size={32}>
          Новый отдел
        </Text>
      </Card>

      <AddNewDepartmentForm />
    </Card>
  );
};

export default NewDepartmentPage;
