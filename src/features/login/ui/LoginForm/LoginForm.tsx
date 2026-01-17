import { Button } from '@/shared/ui/Button/Button';
import { Field } from '@/shared/ui/Field/Field';
import { Logo } from '@/shared/ui/Logo/Logo';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

export const LoginForm = () => {
  return (
    <VStack as="form" gap={24}>
      <Logo />
      <Text align="center" weight="medium" size={28}>
        Вход в личный кабинет
      </Text>
      <VStack gap={16}>
        <Field type="email" value="" placeholder="Email" />
        <Field type="password" value="" placeholder="Пароль" />
      </VStack>
      <Button offset={8}>Войти</Button>
    </VStack>
  );
};
