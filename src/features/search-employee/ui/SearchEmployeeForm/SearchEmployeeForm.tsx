import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { HStack } from '@/shared/ui/Stack';

export const SearchEmployeeForm = () => {
  return (
    <Card as="form" shadow r={16}>
      <HStack justify="space-between" align="stretch">
        <Field value="" placeholder="Имя или фамилия сотрудника" />
        <Button offset={8}>Найти</Button>
      </HStack>
    </Card>
  );
};
