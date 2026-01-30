import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useAsyncReducer } from '@/shared/hooks/useAsyncReducer/useAsyncReducer';
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
  addNewEmployeeActions,
  addNewEmployeeReducer,
  initialState,
} from '../model/slices/addNewEmployeeSlice';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { getAddNewEmployeeData } from '../model/selectors/addNewEmployeeSelectors';
import { useCreateEmployeeMutation } from '../api/addNewEmployeeApi';
import { Controller, useForm } from 'react-hook-form';
import { Cars, Employee, getEmployeeData } from '@/entities/Employee';
import { useGetDepartmentsQuery } from '@/entities/Department';

const stack = getVStack({
  gap: 16,
});

export const AddNewEmployeeForm = () => {
  const dispatch = useAppDispatch();
  useAsyncReducer('addNewEmployee', addNewEmployeeReducer, {
    removeAfterUnmount: false,
  });
  const formData = useAppSelector(getAddNewEmployeeData);
  const employeeData = useAppSelector(getEmployeeData);
  const { data: departmentsList } = useGetDepartmentsQuery(
    {
      companyId: employeeData?.companyId,
    },
    {
      skip: !employeeData?.companyId,
    },
  );
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const { control, handleSubmit, getValues, reset } = useForm<Employee>({
    defaultValues: formData,
    mode: 'onChange',
  });

  useEffect(() => {
    return () => {
      dispatch(addNewEmployeeActions.updateFormData(getValues()));
    };
  }, [dispatch, getValues]);

  const onSubmit = async (data: Employee) => {
    const finalData: Employee = {
      ...data,
      companyName: employeeData?.companyName ?? '',
      companyId: employeeData?.companyId ?? '',

      spent: 0,
      status: 'inactive',
      experimentalFeatures: false,
      notifications: {
        newEmployees: false,
      },
      lastTimeTrip: '',

      city: [Number(data.city)],

      departmentId:
        departmentsList?.find((d) => d.name === data.department)?.id || '1',

      limit: Number(data.limit),
      balance: Number(data.balance),
    };
    try {
      await createEmployee(finalData).unwrap();
      dispatch(addNewEmployeeActions.clearForm());
      reset(initialState.form);
    } catch (e) {
      console.error(e);
    }
  };

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

  return (
    <Card
      as="form"
      onSubmit={handleSubmit(onSubmit)}
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
        <Button type="submit" offset={8} disabled={isLoading}>
          {isLoading ? 'Создание...' : 'Создать сотрудника'}
        </Button>
      </Card>
    </Card>
  );
};
