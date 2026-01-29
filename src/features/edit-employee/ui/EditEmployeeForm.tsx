import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { Select } from '@/shared/ui/Select/Select';
import { Flex, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { TimePicker } from '@/shared/ui/TimePicker/TimePicker';
import { useEffect } from 'react';
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from '../api/editEmployeeApi';
import { Controller, useForm } from 'react-hook-form';
import { Cars, Employee, getEmployeeData } from '@/entities/Employee';
import { useGetDepartmentsQuery } from '@/entities/Department';
import { useNavigate } from 'react-router-dom';
import { getRouteEmployee } from '@/shared/lib/router/paths';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface EditEmployeeFormProps {
  id?: string;
}

const stack = getVStack({
  gap: 16,
});

export const EditEmployeeForm = ({ id }: EditEmployeeFormProps) => {
  const navigate = useNavigate();
  const { data: employeeFromServer, isLoading: isEmployeeLoading } =
    useGetEmployeeByIdQuery(id ?? '');
  const employeeData = useAppSelector(getEmployeeData);
  const { data: departmentsList } = useGetDepartmentsQuery(
    employeeData?.id ?? '',
  );
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();
  const { control, handleSubmit, reset } = useForm<Employee>({
    defaultValues: employeeFromServer || {},
    mode: 'onChange',
  });

  useEffect(() => {
    if (employeeFromServer) {
      reset(employeeFromServer);
    }
  }, [employeeFromServer, reset]);

  const roleOptions = ['Администратор', 'Менеджер', 'Юрист'];

  const departmentsOptions =
    departmentsList?.map((d) => ({
      id: d.id,
      name: d.name,
    })) || [];

  const citiesOptions = [
    'Москва',
    'Санкт-Петербург',
    'Екатеринбург',
    'Сочи',
    'Ростов-на-Дону',
    'Краснодар',
    'Нижний Новгород',
  ].map((name, index) => ({ id: index + 1, name }));

  const carsRaw: Cars[] = ['comfort', 'economy', 'premium'];

  const carsOptions = carsRaw.map((car, index) => ({
    id: index + 1,
    name: (car.charAt(0).toUpperCase() + car.slice(1)) as string,
  }));

  const daysOptions = [
    { id: 1, name: 'Пн' },
    { id: 2, name: 'Вт' },
    { id: 3, name: 'Ср' },
    { id: 4, name: 'Чт' },
    { id: 5, name: 'Пт' },
    { id: 6, name: 'Сб' },
    { id: 7, name: 'Вс' },
  ];

  const onSubmit = async (data: Employee) => {
    const finalData: Employee = {
      ...data,
      departmentId:
        departmentsOptions.find((d) => d.name === data.department)?.id ||
        data.departmentId,
      limit: Number(data.limit),
      balance: Number(data.balance),
      city: Array.isArray(data.city) ? data.city : [Number(data.city)],
      cars: Array.isArray(data.cars) ? data.cars : [data.cars],
    };

    try {
      await updateEmployee(finalData).unwrap();
      navigate(getRouteEmployee(id ?? ''));
    } catch (e) {
      console.error('Ошибка при обновлении:', e);
    }
  };

  if (isEmployeeLoading)
    return (
      <Card p={0} width={770} className={stack.className} style={stack.style}>
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} width="full" height={84} borderRadius={16} />
        ))}
      </Card>
    );

  return (
    <Card
      as="form"
      p={0}
      onSubmit={handleSubmit(onSubmit)}
      width={770}
      className={stack.className}
      style={stack.style}
    >
      <VStack as="fieldset">
        <VStack>
          <Text as="legend" weight="medium" size={24}>
            Данные сотрудника
          </Text>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Имя обязательно для заполнения' }}
            render={({ field, fieldState: { error } }) => (
              <Field
                {...field}
                value={field.value ?? ''}
                placeholder="Имя и фамилия"
                error={error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email обязателен',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Неверный формат email',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Field
                {...field}
                value={field.value ?? ''}
                placeholder="Email"
                type="email"
                error={error?.message}
              />
            )}
          />
          <Flex as="label">
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Телефон обязательно для заполнения' }}
              render={({ field, fieldState: { error } }) => (
                <Field
                  {...field}
                  value={field.value ?? ''}
                  type="tel"
                  placeholder="Телефон"
                  error={error?.message}
                />
              )}
            />
            <Text color="text-tertiary">
              Пришлём СМС со ссылкой на скачивание приложения
            </Text>
          </Flex>
          <Controller
            name="balance"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Field
                {...field}
                type="number"
                placeholder="Текущий баланс"
                error={error?.message}
                value={String(field.value) || ''}
                onChange={(v) => field.onChange(Number(v))}
              />
            )}
          />
        </VStack>
      </VStack>
      <VStack as="fieldset">
        <Card p={0} width={280} className={stack.className} style={stack.style}>
          <Text as="legend" weight="medium" size={24}>
            Роль в системе
          </Text>
          <Controller
            name="role"
            control={control}
            rules={{ required: 'Выберите роль' }}
            render={({ field, fieldState: { error } }) => (
              <Select
                options={roleOptions}
                selected={field.value ?? ''}
                onChange={field.onChange}
                placeholder="Выберите роль"
                error={error?.message}
              />
            )}
          />
        </Card>
      </VStack>
      <VStack as="fieldset">
        <Card p={0} width={280} className={stack.className} style={stack.style}>
          <Text as="legend" weight="medium" size={24}>
            Отдел
          </Text>
          <Controller
            name="department"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Select
                options={departmentsOptions}
                selected={
                  departmentsOptions.find((opt) => opt.name === field.value) ??
                  null
                }
                onChange={(selected) => field.onChange(selected?.name)}
                error={error?.message}
                placeholder="Без отдела"
              />
            )}
          />
        </Card>
      </VStack>
      <VStack as="fieldset">
        <VStack>
          <Text as="legend" weight="medium" size={24}>
            Личный лимит
          </Text>
          <Controller
            name="limit"
            control={control}
            rules={{ required: 'Баланс обязателен для заполнения' }}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
              <Field
                {...field}
                value={String(value) || ''}
                type="number"
                placeholder="Безлимит"
                error={error?.message}
              />
            )}
          />
        </VStack>
      </VStack>
      <VStack as="fieldset">
        <Card p={0} width={280} className={stack.className} style={stack.style}>
          <Text as="legend" weight="medium" size={24}>
            Личные настройки доступа
          </Text>
          <Controller
            name="time"
            control={control}
            rules={{ required: 'Выберите доступные часы' }}
            render={({ field, fieldState: { error } }) => (
              <TimePicker
                value={field.value ?? ''}
                onChange={field.onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            rules={{ required: 'Выберите город' }}
            render={({ field, fieldState: { error } }) => {
              const currentId = Array.isArray(field.value)
                ? field.value[0]
                : field.value;
              const selectedValue =
                citiesOptions.find((opt) => opt.id === currentId) ?? null;

              return (
                <Select
                  options={citiesOptions}
                  selected={selectedValue}
                  onChange={(selected) => {
                    field.onChange(selected ? [selected.id] : []);
                  }}
                  error={error?.message}
                />
              );
            }}
          />
          <Controller
            name="cars"
            control={control}
            rules={{ required: 'Выберите автомобиль' }}
            render={({ field, fieldState: { error } }) => {
              const currentValue = Array.isArray(field.value)
                ? field.value[0]
                : field.value;
              const selectedValue =
                carsOptions.find((opt) => opt.name === currentValue) ?? null;

              return (
                <Select
                  options={carsOptions}
                  selected={selectedValue}
                  onChange={(selected) => {
                    const name = selected?.name;
                    field.onChange(name ? [name] : []);
                  }}
                  error={error?.message}
                />
              );
            }}
          />
          <Controller
            name="days"
            control={control}
            render={({ field }) => (
              <Select
                options={daysOptions}
                selected={
                  daysOptions.find((opt) =>
                    Array.isArray(field.value)
                      ? field.value.includes(opt.id)
                      : opt.id === field.value,
                  ) ?? null
                }
                onChange={(selected) => {
                  const selectedId = selected?.id;
                  field.onChange(selectedId ? [selectedId] : []);
                }}
              />
            )}
          />
        </Card>
      </VStack>
      <Card p={0} width={200} className={stack.className} style={stack.style}>
        <Button type="submit" offset={8} disabled={isUpdating}>
          {isUpdating ? 'Сохранение...' : 'Обновить данные'}
        </Button>
      </Card>
    </Card>
  );
};
