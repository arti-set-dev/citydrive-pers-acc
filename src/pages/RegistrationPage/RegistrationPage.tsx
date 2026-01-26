import { RegistrationForm } from '@/features/login';
import { getRouteAuth } from '@/shared/lib/router/paths';
import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { HStack } from '@/shared/ui/Stack';

const stack = getFlex({
  align: 'center',
  justify: 'center',
  gap: 16,
});

const RegistrationPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Card p={0} width={540}>
        <RegistrationForm />
        <HStack justify="space-between">
          <AppLink variant="regular" to={getRouteAuth()}>
            Уже есть аккаунт? Войти
          </AppLink>
        </HStack>
      </Card>
    </Card>
  );
};

export default RegistrationPage;
