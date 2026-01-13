import { Button } from '@/shared/ui/Button/Button';
import { Field } from '@/shared/ui/Field/Field';
import { Select } from '@/shared/ui/Select/Select';
import { Grid } from '@/shared/ui/Stack';

export const EmployeesFilter = () => {
  const statuses = [
    { id: 1, name: 'Все статусы' },
    { id: 2, name: 'Активны' },
    { id: 3, name: 'Не активны' },
  ];

  const roles = [
    { id: 1, name: 'Все роли' },
    { id: 2, name: 'Администратор' },
    { id: 3, name: 'Менеджер' },
    { id: 4, name: 'Сотрудник' },
  ];

  const departments = [
    { id: 1, name: 'Все отделы' },
    { id: 2, name: 'Бухгалтерия' },
    { id: 3, name: 'Финансовый отдел' },
    { id: 4, name: 'Отдел продаж' },
  ];

  return (
    <Grid cols={{ base: 2, lg: 1 }} gap={16}>
      <Field value="" placeholder="Имя или телефон сотрудника" />
      <Grid gap={16} cols={{ base: 4, lg: 4, sm: 2 }}>
        <Select options={statuses} />
        <Select options={roles} />
        <Select options={departments} />
        <Button disabled>Сбросить</Button>
      </Grid>
    </Grid>
  );
};
