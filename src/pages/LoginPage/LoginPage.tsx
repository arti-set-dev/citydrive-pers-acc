import { ImportDataAboutCompanyButton } from '@/features/import-data-about-company';
import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { Logo } from '@/shared/ui/Logo/Logo';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

const stack = getFlex({
  align: 'center',
  justify: 'center',
  gap: 16,
});

const LoginPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Card p={0} width={540}>
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
        <HStack justify="space-between">
          <AppLink to="">Забыли пароль</AppLink>
          <ImportDataAboutCompanyButton />
        </HStack>
      </Card>
    </Card>
  );
};

export default LoginPage;
