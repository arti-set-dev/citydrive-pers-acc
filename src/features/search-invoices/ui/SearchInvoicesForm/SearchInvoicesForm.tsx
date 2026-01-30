import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { HStack } from '@/shared/ui/Stack';

interface SearchInvoicesFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInvoicesForm = ({
  value,
  onChange,
}: SearchInvoicesFormProps) => {
  return (
    <Card p={16} shadow r={16} onSubmit={(e) => e.preventDefault()}>
      <HStack justify="space-between" as="form" align="stretch">
        <Field value={value} onChange={onChange} placeholder="Найти отчёт" />
        <Button>Найти</Button>
      </HStack>
    </Card>
  );
};
