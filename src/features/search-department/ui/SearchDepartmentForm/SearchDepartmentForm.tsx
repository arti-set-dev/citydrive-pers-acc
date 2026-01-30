import { Button } from '@/shared/ui/Button/Button';
import { Field } from '@/shared/ui/Field/Field';
import { HStack } from '@/shared/ui/Stack';

interface SearchDepartmentFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchDepartmentForm = ({
  value,
  onChange,
}: SearchDepartmentFormProps) => {
  return (
    <HStack as="form" justify="space-between" align="stretch">
      <Field value={value} onChange={onChange} placeholder="Название отдела" />
      <Button offset={8}>Найти</Button>
    </HStack>
  );
};
