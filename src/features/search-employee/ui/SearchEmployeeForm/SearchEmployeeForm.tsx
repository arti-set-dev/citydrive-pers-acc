import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { HStack } from '@/shared/ui/Stack';

interface SearchEmployeeFormProps {
  value: string;
  onChange: (val: string) => void;
}

export const SearchEmployeeForm = ({
  value,
  onChange,
}: SearchEmployeeFormProps) => {
  return (
    <Card as="form" shadow r={16} onSubmit={(e) => e.preventDefault()}>
      <HStack justify="space-between" align="stretch">
        <Field
          value={value}
          onChange={onChange}
          placeholder="Имя или фамилия сотрудника"
        />
        <Button offset={8}>Найти</Button>
      </HStack>
    </Card>
  );
};
