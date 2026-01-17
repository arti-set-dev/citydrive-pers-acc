import { ImportDataAboutCompanyButton } from '@/features/import-data-about-company';
import { LoginForm } from '@/features/login';
import { getRouteForgotAuthPassword } from '@/shared/lib/router/paths';
import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { HStack } from '@/shared/ui/Stack';

const stack = getFlex({
  align: 'center',
  justify: 'center',
  gap: 16,
});

const LoginPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Card p={0} width={540}>
        <LoginForm />
        <HStack justify="space-between">
          <AppLink variant="regular" to={getRouteForgotAuthPassword()}>
            Забыли пароль
          </AppLink>
          <ImportDataAboutCompanyButton />
        </HStack>
      </Card>
    </Card>
  );
};

export default LoginPage;
