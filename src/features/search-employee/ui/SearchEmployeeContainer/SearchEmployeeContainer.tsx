import { useState } from 'react';
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

  return (
    <>
      <SearchEmployeeForm value={search} onChange={setSearch} />
      <EmployeeList
        activeKeys={activeKeys}
        filters={{
          name: debouncedSearch,
          departmentId: departmentId,
        }}
      />
    </>
  );
};
