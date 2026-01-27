import { Department, DepartmentList } from '@/entities/Department';
import { getEmployeeData } from '@/entities/Employee';
import {
  DeleteDepartmentButton,
  DeleteDepartmentModal,
} from '@/features/delete-department';
import { SearchDepartmentForm } from '@/features/search-department';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import {
  getRouteDepartmentEdit,
  getRouteDepartmentNew,
} from '@/shared/lib/router/paths';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { ActionPopover } from '@/shared/ui/Popover/Popover';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stack = getVStack({
  gap: 16,
});

const DepartmentsPage = () => {
  const employeeData = useAppSelector(getEmployeeData);
  const navigate = useNavigate();
  const [deletingDept, setDeletingDept] = useState<Department | null>(null);

  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <HStack justify="space-between">
        <Text as="h1" size={32} weight="bold">
          Отделы
        </Text>
        <AppLink to={getRouteDepartmentNew()} variant="outline">
          Добавить отдел
        </AppLink>
      </HStack>
      <SearchDepartmentForm />
      <DepartmentList
        companyId={employeeData?.companyId}
        renderActions={(department) => (
          <ActionPopover>
            <Button
              variant="clear"
              onClick={() => navigate(getRouteDepartmentEdit(department.id))}
            >
              Edit
            </Button>
            <DeleteDepartmentButton
              onClick={() => setDeletingDept(department)}
            />
          </ActionPopover>
        )}
      />
      <HStack justify="space-between">
        <Pagination currentPage="3" totalPages={10} />
        <Text color="text-tertiary">1-50 из 883</Text>
      </HStack>

      <DeleteDepartmentModal
        department={deletingDept}
        isOpen={Boolean(deletingDept)}
        onClose={() => setDeletingDept(null)}
      />
    </Card>
  );
};

export default DepartmentsPage;
