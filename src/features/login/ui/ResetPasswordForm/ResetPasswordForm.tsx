import { Button } from '@/shared/ui/Button/Button';
import { Field } from '@/shared/ui/Field/Field';
import { Logo } from '@/shared/ui/Logo/Logo';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

export const ResetPasswordForm = () => {
  return (
    <VStack as="form" gap={24}>
      <Logo />
      <Text align="center" weight="medium" size={28}>
        Сброс пароля
      </Text>
      <VStack gap={16}>
        <Field
          fullWidth
          value=""
          placeholder="Введите 6 значный код из письма"
        />
      </VStack>
      <Button offset={8}>Отправить</Button>
    </VStack>
  );
};
