import { Button } from '@citydrive/shared/ui/Button/Button';
import { Field } from '@citydrive/shared/ui/Field/Field';
import { HStack } from '@citydrive/shared/ui/Stack';

interface SearchDepartmentFormProps {
  value: string;
  onChange: (value: string) => void;
  'data-testid'?: string;
}

export const SearchDepartmentForm = ({
  value,
  onChange,
  'data-testid': testId = 'SearchDepartmentForm',
}: SearchDepartmentFormProps) => {
  return (
    <HStack as="form" justify="space-between" align="stretch">
      <Field
        value={value}
        onChange={onChange}
        placeholder="Название отдела"
        data-testid={testId + '.Input'}
      />
      <Button offset={8}>Найти</Button>
    </HStack>
  );
};
