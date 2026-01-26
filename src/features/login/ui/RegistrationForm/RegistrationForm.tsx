import React, { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { Field } from '@/shared/ui/Field/Field';
import { Logo } from '@/shared/ui/Logo/Logo';
import { Select } from '@/shared/ui/Select/Select';
import { VStack, Flex } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
// Предполагаемый путь к слайсу

export const RegistrationForm = () => {
  //   const dispatch = useAppDispatch();
  //   const navigate = useNavigate();

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

    // try {
    //   const result = await register({
    //     ...data,
    //     department: selectedDept?.name,
    //   }).unwrap();

    //   // Логика после успешной регистрации (как в LoginForm)
    //   localStorage.setItem('token', result.token);
    //   navigate(getRouteHome());
    // } catch (err) {
    //   console.error('Ошибка регистрации:', err);
    // }
  };

  return (
    <VStack as="form" gap={24} onSubmit={onRegister}>
      <Logo />
      <Text align="center" weight="medium" size={28}>
        Регистрация компании в личном кабинете
      </Text>

      <VStack gap={16} as="fieldset">
        <Text weight="medium" size={20}>
          Данные администратора
        </Text>
        <Field value="" fullWidth placeholder="Имя и фамилия" required />
        <Field
          name="email"
          type="email"
          value=""
          fullWidth
          placeholder="Email"
          required
        />
        <Flex direction="column" gap={4}>
          <Field
            value=""
            name="phone"
            type="tel"
            fullWidth
            placeholder="Номер телефона"
            required
          />
          <Text color="text-tertiary" size={12}>
            Пришлём СМС со ссылкой на скачивание приложения
          </Text>
        </Flex>
        <Field
          value=""
          name="password"
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
          value=""
          name="companyName"
          fullWidth
          placeholder="Название компании"
          required
        />
        <Field
          value=""
          name="position"
          fullWidth
          placeholder="Ваша должность"
          required
        />

        <VStack gap={8}>
          <Text size={14} color="text-secondary">
            Отдел (необязательно)
          </Text>
          <Select
            options={departments}
            onChange={setSelectedDept}
            selected={selectedDept}
            placeholder="Выберите отдел"
          />
        </VStack>
      </VStack>

      <Button offset={8} type="submit">
        Зарегистрироваться
      </Button>
    </VStack>
  );
};
