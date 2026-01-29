import {
  Employee,
  EmployeeList,
  useGetEmployeesListQuery,
} from '@/entities/Employee';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce';
import { Button } from '@/shared/ui/Button/Button';
import { Field } from '@/shared/ui/Field/Field';
import { Select } from '@/shared/ui/Select/Select';
import { Grid } from '@/shared/ui/Stack';
import { useMemo, useState } from 'react';

export const EmployeesFilter = () => {
  const activeKeys: Array<keyof Employee> = [
    'name',
    'email',
    'role',
    'status',
    'spent',
    'limit',
  ];

  const initialFilters = {
    name: '',
    role: 'all',
    department: 'all',
    status: 'all',
  };

  const [filters, setFilters] = useState(initialFilters);

  const isDirty = useMemo(() => {
    return JSON.stringify(filters) !== JSON.stringify(initialFilters);
  }, [filters, initialFilters]);

  const debouncedSearch = useDebounce(filters.name, 400);

  const activeFilters = {
    ...filters,
    name: debouncedSearch,
  };

  const { data: employees = [] } = useGetEmployeesListQuery();

  const roles = useMemo(
    () => [
      { id: 'all', name: 'Все роли' },
      ...Array.from(new Set(employees.map((e) => e.role))).map((r) => ({
        id: String(r),
        name: r,
      })),
    ],
    [employees],
  );
  const departments = [
    { id: 'all', name: 'Все отделы' },
    ...Array.from(new Set(employees.map((e) => e.department))).map((dept) => ({
      id: dept,
      name: dept,
    })),
  ];

  const statuses = [
    { id: 'all', name: 'Все статусы' },
    { id: 'active', name: 'Активен' },
    { id: 'inactive', name: 'Неактивен' },
  ];

  const handleReset = () => {
    setFilters(initialFilters);
  };

  return (
    <>
      <Grid cols={{ base: 2, lg: 1 }} gap={16}>
        <Field
          value={filters.name}
          onChange={(val) => setFilters((prev) => ({ ...prev, name: val }))}
          placeholder="Имя или телефон сотрудника"
        />
        <Grid gap={16} cols={{ base: 4, lg: 4, sm: 2 }}>
          <Select
            selected={statuses.find((s) => s.id === filters.status)}
            options={statuses}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, status: val?.id ?? 'all' }))
            }
            getOptionKey={(opt) => opt.id}
            getOptionLabel={(opt) => opt.name}
          />

          <Select
            selected={roles.find((r) => r.id === filters.role)}
            options={roles}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, role: val?.id ?? 'all' }))
            }
          />

          <Select
            selected={departments.find((d) => d.id === filters.department)}
            options={departments}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, department: val?.id ?? 'all' }))
            }
          />
          <Button onClick={handleReset} disabled={!isDirty}>
            Сбросить
          </Button>
        </Grid>
      </Grid>
      <EmployeeList activeKeys={activeKeys} filters={activeFilters} />
    </>
  );
};
