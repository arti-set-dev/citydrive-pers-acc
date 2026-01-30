import { useState } from 'react';
import { SearchDepartmentForm } from '../SearchDepartmentForm/SearchDepartmentForm';
import { Department, DepartmentList } from '@/entities/Department';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { getEmployeeData } from '@/entities/Employee';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce';

export const DepartmentSearchContainer = ({
  renderActions,
}: {
  renderActions: (department: Department) => React.ReactNode;
}) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const employeeData = useAppSelector(getEmployeeData);

  return (
    <>
      <SearchDepartmentForm value={search} onChange={setSearch} />
      <DepartmentList
        companyId={employeeData?.companyId}
        search={debouncedSearch}
        renderActions={renderActions}
      />
    </>
  );
};
