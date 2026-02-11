import React, { useState } from 'react';
import { Button } from '@citydrive/shared/ui/Button/Button';
import { Field } from '@citydrive/shared/ui/Field/Field';
import { Logo } from '@citydrive/shared/ui/Logo/Logo';
import { VStack } from '@citydrive/shared/ui/Stack';
import { Text } from '@citydrive/shared/ui/Text/Text';
import { useForgotPasswordMutation } from '../../api/loginApi/loginApi';

export const ForgotPasswordForm = ({
  onNext,
}: {
  onNext: (email: string) => void;
}) => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      onNext(email);
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  return (
    <VStack as="form" gap={24} onSubmit={onSubmit}>
      <Logo />
      <Text align="center" weight="medium" size={28}>
        Восстановление пароля
      </Text>
      <VStack gap={16}>
        <Field
          fullWidth
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
          required
        />
      </VStack>
      <Button offset={8} disabled={isLoading}>
        {isLoading ? 'Отправка...' : 'Восстановить пароль'}
      </Button>
    </VStack>
  );
};
