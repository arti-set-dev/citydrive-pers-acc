import { memo, useState } from 'react';
import { SearchDepartmentForm } from '../SearchDepartmentForm/SearchDepartmentForm';
import { Department, DepartmentList } from '@/entities/Department';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { getEmployeeData } from '@/entities/Employee';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce';

export const DepartmentSearchContainer = memo(
  function DepartmentSearchContainer({
    renderActions,
  }: {
    renderActions: (department: Department) => React.ReactNode;
  }) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const companyId = useAppSelector(
      (state) => getEmployeeData(state)?.companyId,
    );

    return (
      <>
        <SearchDepartmentForm
          value={search}
          onChange={setSearch}
          data-testid="SearchDepartment"
        />
        <DepartmentList
          companyId={companyId}
          search={debouncedSearch}
          renderActions={renderActions}
          data-testid="DepartmentList"
        />
      </>
    );
  },
);
