import { Department } from '@/entities/Department';
import {
  DeleteDepartmentButton,
  DeleteDepartmentModal,
} from '@/features/delete-department';
import { DepartmentSearchContainer } from '@/features/search-department';
import {
  getRouteDepartmentEdit,
  getRouteDepartmentNew,
} from '@/shared/lib/router/paths';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { ActionPopover } from '@/shared/ui/Popover/Popover';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stack = getVStack({
  gap: 16,
});

const DepartmentsPage = () => {
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
      <DepartmentSearchContainer
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

      <DeleteDepartmentModal
        department={deletingDept}
        isOpen={Boolean(deletingDept)}
        onClose={() => setDeletingDept(null)}
      />
    </Card>
  );
};

export default DepartmentsPage;
