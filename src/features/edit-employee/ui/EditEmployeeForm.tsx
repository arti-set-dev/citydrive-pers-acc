import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { Select } from '@/shared/ui/Select/Select';
import { Flex, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { TimePicker } from '@/shared/ui/TimePicker/TimePicker';
import { useState } from 'react';

const stack = getVStack({
  gap: 16,
});

export const EditEmployeeForm = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const role = [
    { id: 1, name: 'Администратор' },
    { id: 2, name: 'Менеджер' },
    { id: 3, name: 'Юрист' },
  ];

  const departments = [
    { id: 1, name: 'Отдел продаж' },
    { id: 2, name: 'Финансовый отдел' },
    { id: 3, name: 'Юридический отдел' },
  ];

  const period = [
    { id: 1, name: 'Ежедневно' },
    { id: 2, name: 'Ежемесячно' },
    { id: 3, name: 'Ежегодно' },
  ];

  const cities = [
    { id: 1, name: 'Москва' },
    { id: 2, name: 'Санкт-Петербург' },
    { id: 3, name: 'Екатеринбург' },
    { id: 4, name: 'Сочи' },
    { id: 5, name: 'Ростов-на-Дону' },
    { id: 6, name: 'Краснодар' },
    { id: 7, name: 'Нижний Новгород' },
  ];

  const cars = [
    { id: 1, name: 'Kia Rio' },
    { id: 2, name: 'Ford Transit' },
    { id: 3, name: 'BMW 318i' },
    { id: 4, name: 'Geely Coolray' },
  ];

  return (
    <Card
      as="form"
      p={0}
      width={770}
      className={stack.className}
      style={stack.style}
    >
      <VStack as="fieldset">
        <VStack>
          <Text as="legend" weight="medium" size={24}>
            Данные сотрудника
          </Text>
          <Field value="" placeholder="Имя и фамилия" />
          <Field value="" placeholder="Email" />
          <Flex as="label">
            <Field value="" type="tel" placeholder="Номер телефона" />
            <Text color="text-tertiary">
              Пришлём СМС со ссылкой на скачивание приложения
            </Text>
          </Flex>
        </VStack>
      </VStack>
      <VStack as="fieldset">
        <Card p={0} width={280} className={stack.className} style={stack.style}>
          <Text as="legend" weight="medium" size={24}>
            Роль в системе
          </Text>
          <Select
            selected={selectedRole}
            onChange={setSelectedRole}
            placeholder="Введите значение"
            options={role}
          />
        </Card>
      </VStack>
      <VStack as="fieldset">
        <Card p={0} width={280} className={stack.className} style={stack.style}>
          <Text as="legend" weight="medium" size={24}>
            Отдел
          </Text>
          <Select
            options={departments}
            onChange={setSelectedDept}
            selected={selectedDept}
            placeholder="Без отдела"
          />
        </Card>
      </VStack>
      <VStack as="fieldset">
        <VStack>
          <Text as="legend" weight="medium" size={24}>
            Личный лимит
          </Text>
          <Field value="" placeholder="Безлимит" />
        </VStack>
      </VStack>
      <VStack as="fieldset">
        <Card p={0} width={280} className={stack.className} style={stack.style}>
          <Text as="legend" weight="medium" size={24}>
            Личные настройки доступа
          </Text>
          <TimePicker />
          <Select
            options={period}
            selected={selectedPeriod}
            onChange={setSelectedPeriod}
          />
          <Select
            options={cities}
            selected={selectedCity}
            onChange={setSelectedCity}
          />
          <Select
            options={cars}
            selected={selectedCar}
            onChange={setSelectedCar}
          />
        </Card>
      </VStack>
      <Card p={0} width={200} className={stack.className} style={stack.style}>
        <Button offset={8} type="submit">
          Создать сотрудника
        </Button>
      </Card>
    </Card>
  );
};
