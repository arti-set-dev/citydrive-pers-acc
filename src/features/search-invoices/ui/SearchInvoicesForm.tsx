import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { HStack } from '@/shared/ui/Stack';

export const SearchInvoicesForm = () => {
  return (
    <Card p={16} shadow r={16}>
      <HStack justify="space-between" as="form" align="stretch">
        <Field value="" placeholder="Найти отчёт" />
        <Button>Найти</Button>
      </HStack>
    </Card>
  );
};
