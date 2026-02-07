import { ForgotPasswordForm, ResetPasswordForm } from '@/features/login';
import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { Card } from '@/shared/ui/Card/Card';
import { useState } from 'react';

const stack = getFlex({
  align: 'center',
  justify: 'center',
  gap: 16,
});

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');

  const handleNext = (userEmail: string) => {
    setEmail(userEmail);
    setStep('code');
  };
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Card p={0} width={540}>
        {step === 'email' ? (
          <ForgotPasswordForm onNext={handleNext} />
        ) : (
          <ResetPasswordForm email={email} />
        )}
      </Card>
    </Card>
  );
};

export default ForgotPasswordPage;
