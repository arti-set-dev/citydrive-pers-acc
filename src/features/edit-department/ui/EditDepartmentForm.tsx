import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

export const EditDepartmentForm = () => {
  return (
    <Card p={0} width={540}>
      <VStack as="form">
        <VStack as="label">
          <Text>Название отдела</Text>
          <Field value="Финансовый отдел" placeholder="Название отдела" />
        </VStack>
        <VStack as="label">
          <Text>Лимит отдела</Text>
          <Field value="100 000" placeholder="Лимит отдела" />
        </VStack>
        <Button>Сохранить изменения</Button>
      </VStack>
    </Card>
  );
};
