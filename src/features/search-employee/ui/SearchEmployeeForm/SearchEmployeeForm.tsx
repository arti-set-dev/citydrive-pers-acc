import { Button } from '@citydrive/shared/ui/Button/Button';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { Field } from '@citydrive/shared/ui/Field/Field';
import { HStack } from '@citydrive/shared/ui/Stack';

interface SearchEmployeeFormProps {
  value: string;
  onChange: (val: string) => void;
  'data-testid'?: string;
}

export const SearchEmployeeForm = ({
  value,
  onChange,
  'data-testid': testId = 'SearchEmployee',
}: SearchEmployeeFormProps) => {
  return (
    <Card
      as="form"
      shadow
      r={16}
      onSubmit={(e) => e.preventDefault()}
      data-testid={testId}
    >
      <HStack justify="space-between" align="stretch">
        <Field
          value={value}
          onChange={onChange}
          placeholder="Имя или фамилия сотрудника"
          data-testid={`${testId}.Input`}
        />
        <Button offset={8} data-testid={`${testId}.Button`}>
          Найти
        </Button>
      </HStack>
    </Card>
  );
};
