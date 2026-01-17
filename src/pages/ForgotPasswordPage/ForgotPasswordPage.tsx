import { ForgotPasswordForm } from '@/features/login';
import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { Card } from '@/shared/ui/Card/Card';

const stack = getFlex({
  align: 'center',
  justify: 'center',
  gap: 16,
});

const ForgotPasswordPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Card p={0} width={540}>
        <ForgotPasswordForm />
      </Card>
    </Card>
  );
};

export default ForgotPasswordPage;
