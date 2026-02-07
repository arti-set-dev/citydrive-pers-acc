import { ResetPasswordForm } from '@/features/login';
import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { Card } from '@/shared/ui/Card/Card';
import { useSearchParams } from 'react-router-dom'; // Добавь это

const stack = getFlex({
  align: 'center',
  justify: 'center',
  gap: 16,
});

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Card p={0} width={540}>
        <ResetPasswordForm email={email} />
      </Card>
    </Card>
  );
};

export default ResetPasswordPage;
