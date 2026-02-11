import { Button } from '@citydrive/shared/ui/Button/Button';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { Field } from '@citydrive/shared/ui/Field/Field';
import { HStack } from '@citydrive/shared/ui/Stack';

interface SearchInvoicesFormProps {
  value: string;
  onChange: (value: string) => void;
  'data-testid'?: string;
}

export const SearchInvoicesForm = ({
  value,
  onChange,
  'data-testid': testId = 'SearchInvoices',
}: SearchInvoicesFormProps) => {
  return (
    <Card
      p={16}
      shadow
      r={16}
      onSubmit={(e) => e.preventDefault()}
      data-testid={testId}
    >
      <HStack justify="space-between" as="form" align="stretch">
        <Field
          value={value}
          onChange={onChange}
          placeholder="Найти отчёт"
          data-testid={`${testId}.Input`}
        />
        <Button data-testid={`${testId}.Button`}>Найти</Button>
      </HStack>
    </Card>
  );
};
