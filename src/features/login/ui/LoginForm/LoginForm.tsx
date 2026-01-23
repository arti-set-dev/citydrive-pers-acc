import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useAsyncReducer } from '@/shared/hooks/useAsyncReducer/useAsyncReducer';
import { Button } from '@/shared/ui/Button/Button';
import { Field } from '@/shared/ui/Field/Field';
import { Logo } from '@/shared/ui/Logo/Logo';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import {
  loginActions,
  loginReducer,
} from '../../model/slices/loginSlice/loginSlice';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import {
  getLoginEmail,
  getLoginName,
  getLoginPassword,
} from '../../model/selectors/loginSelectors';
import { useLoginMutation } from '../../api/loginApi/loginApi';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRouteHome } from '@/shared/lib/router/paths';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  useAsyncReducer('login', loginReducer, { removeAfterUnmount: false });
  const userName = useAppSelector(getLoginName);
  const userEmail = useAppSelector(getLoginEmail);
  const userPassword = useAppSelector(getLoginPassword);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const onChangeUserName = (value: string) => {
    dispatch(loginActions.setLoginName(value));
  };

  const onChangeUserEmail = (value: string) => {
    dispatch(loginActions.setLoginEmail(value));
  };

  const onChangeUserPassword = (value: string) => {
    dispatch(loginActions.setLoginPassword(value));
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({
        name: userName,
        email: userEmail,
        password: userPassword,
        isAuth: true,
      }).unwrap();
      localStorage.setItem('token', result.token);
      dispatch(loginActions.setIsAuth(true));
      const from = location.state?.from?.pathname || getRouteHome();
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Ошибка при входе:', err);
    }
  };

  return (
    <VStack as="form" gap={24} onSubmit={onLogin}>
      <Logo />
      <Text align="center" weight="medium" size={28}>
        Вход в личный кабинет
      </Text>
      <VStack gap={16}>
        <Field
          type="text"
          value={userName}
          onChange={onChangeUserName}
          placeholder="Имя"
        />
        <Field
          type="email"
          value={userEmail}
          onChange={onChangeUserEmail}
          placeholder="Email"
        />
        <Field
          type="password"
          value={userPassword}
          onChange={onChangeUserPassword}
          placeholder="Пароль"
        />
      </VStack>
      <Button disabled={isLoading} offset={8}>
        {isLoading ? 'Загрузка...' : 'Войти'}
      </Button>
    </VStack>
  );
};
