import { AddNewEmployeeForm } from '@/features/add-new-employee';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

const NewEmployeePage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" size={{ base: 32, sm: 20 }} weight="bold">
        Новый сотрудник
      </Text>
      <AddNewEmployeeForm />
    </Card>
  );
};

export default NewEmployeePage;
