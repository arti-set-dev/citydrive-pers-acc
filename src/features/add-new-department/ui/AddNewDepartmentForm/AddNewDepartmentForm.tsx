import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

export const AddNewDepartmentForm = () => {
  return (
    <Card p={0} width={540}>
      <VStack as="form">
        <VStack as="label">
          <Text>Название отдела</Text>
          <Field value="" placeholder="Название отдела" />
        </VStack>
        <VStack as="label">
          <Text>Лимит отдела</Text>
          <Field value="" placeholder="Лимит отдела" />
        </VStack>
        <Button>Добавить отдел</Button>
      </VStack>
    </Card>
  );
};
