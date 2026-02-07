import React, { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { Field } from '@/shared/ui/Field/Field';
import { Logo } from '@/shared/ui/Logo/Logo';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { useResetPasswordMutation } from '../../api/loginApi/loginApi';
import { useNavigate } from 'react-router-dom';
import { getRouteAuth } from '@/shared/lib/router/paths';

export const ResetPasswordForm = ({ email }: { email: string }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({ email, code, password: newPassword }).unwrap();
      navigate(getRouteAuth());
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  return (
    <VStack as="form" gap={24} onSubmit={onSubmit}>
      <Logo />
      <Text align="center" weight="medium" size={28}>
        Сброс пароля
      </Text>
      <VStack gap={16}>
        <Field
          fullWidth
          value={code}
          onChange={setCode}
          placeholder="Введите 6 значный код"
          required
        />
        <Field
          fullWidth
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Новый пароль"
          required
        />
      </VStack>
      <Button offset={8} disabled={isLoading}>
        {isLoading ? 'Сбрасываем...' : 'Отправить'}
      </Button>
    </VStack>
  );
};
