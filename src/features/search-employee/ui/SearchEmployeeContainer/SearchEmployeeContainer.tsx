import { useMemo, useState } from 'react';
import { EmployeeList } from '@/entities/Employee';
import { Employee } from '@/entities/Employee';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce';
import { SearchEmployeeForm } from '../SearchEmployeeForm/SearchEmployeeForm';

interface SearchEmployeeContainerProps {
  departmentId: string;
}

export const SearchEmployeeContainer = ({
  departmentId,
}: SearchEmployeeContainerProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const activeKeys: Array<keyof Employee> = [
    'name',
    'role',
    'status',
    'limit',
    'spent',
  ];

  const filters = useMemo(
    () => ({
      name: debouncedSearch,
      departmentId,
    }),
    [debouncedSearch, departmentId],
  );

  return (
    <>
      <SearchEmployeeForm
        value={search}
        onChange={setSearch}
        data-testid="SearchEmployee"
      />
      <EmployeeList activeKeys={activeKeys} filters={filters} />
    </>
  );
};
