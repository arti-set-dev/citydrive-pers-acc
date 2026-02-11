import { LoginForm } from '@citydrive/auth';
import {
  getRouteForgotAuthPassword,
  getRouteRegistration,
} from '@citydrive/shared/lib/router/paths';
import { getFlex } from '@citydrive/shared/lib/stack/flex/getFlex';
import { AppLink } from '@citydrive/shared/ui/AppLink/AppLink';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { HStack } from '@citydrive/shared/ui/Stack';

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
          <AppLink variant="regular" to={getRouteRegistration()}>
            Регистрация
          </AppLink>
        </HStack>
      </Card>
    </Card>
  );
};

export default LoginPage;
