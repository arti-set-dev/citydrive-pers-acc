import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { Field } from '@/shared/ui/Field/Field';
import { Logo } from '@/shared/ui/Logo/Logo';
import { Select } from '@/shared/ui/Select/Select';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { useRegisterMutation } from '../../api/loginApi/loginApi'; // Импорт мутации
import { getRouteHome } from '@/shared/lib/router/paths';

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  // Состояния полей
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    companyName: '',
    position: '',
  });

  const [selectedDept, setSelectedDept] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const departments = [
    { id: 1, name: 'Отдел продаж' },
    { id: 2, name: 'Финансовый отдел' },
    { id: 3, name: 'Юридический отдел' },
  ];

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register({
        ...formData,
        departmentId: selectedDept?.id,
      }).unwrap();

      alert('Регистрация успешна! Теперь вы можете войти.');
      navigate(getRouteHome());
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  };

  const onChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <VStack as="form" gap={24} onSubmit={onRegister}>
      <Logo />
      <Text align="center" weight="medium" size={28}>
        Регистрация компании
      </Text>

      <VStack gap={16} as="fieldset">
        <Text weight="medium" size={20}>
          Данные администратора
        </Text>
        <Field
          value={formData.name}
          onChange={onChange('name')}
          fullWidth
          placeholder="Имя и фамилия"
          required
        />
        <Field
          value={formData.email}
          onChange={onChange('email')}
          type="email"
          fullWidth
          placeholder="Email"
          required
        />
        <Field
          value={formData.phone}
          onChange={onChange('phone')}
          type="tel"
          fullWidth
          placeholder="Номер телефона"
          required
        />
        <Field
          value={formData.password}
          onChange={onChange('password')}
          type="password"
          fullWidth
          placeholder="Пароль"
          required
        />
      </VStack>

      <VStack gap={16} as="fieldset">
        <Text weight="medium" size={20}>
          Данные организации
        </Text>
        <Field
          value={formData.companyName}
          onChange={onChange('companyName')}
          fullWidth
          placeholder="Название компании"
          required
        />
        <Field
          value={formData.position}
          onChange={onChange('position')}
          fullWidth
          placeholder="Ваша должность"
          required
        />
        <Select
          options={departments}
          onChange={setSelectedDept}
          selected={selectedDept}
          placeholder="Выберите отдел"
        />
      </VStack>

      <Button offset={8} type="submit" disabled={isLoading}>
        {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
    </VStack>
  );
};
