import { Button } from '@/shared/ui/Button/Button';
import { Field } from '@/shared/ui/Field/Field';
import { HStack } from '@/shared/ui/Stack';

export const SearchDepartmentForm = () => {
  return (
    <HStack as="form" justify="space-between" align="stretch">
      <Field value="" placeholder="Название отдела" />
      <Button offset={8}>Найти</Button>
    </HStack>
  );
};
