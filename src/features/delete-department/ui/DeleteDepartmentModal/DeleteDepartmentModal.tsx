import { Department } from '@/entities/Department';
import { useDeleteDepartmentMutation } from '../../api/deleteDepartmentApi';
import { Modal } from '@/shared/ui/Modal/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Button } from '@/shared/ui/Button/Button';

export const DeleteDepartmentModal = ({
  department,
  isOpen,
  onClose,
}: {
  department: Department | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [deleteDepartment, { isLoading }] = useDeleteDepartmentMutation();

  if (!department) return null;

  const onDelete = async () => {
    await deleteDepartment(department.id).unwrap();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <VStack gap={24}>
        <VStack gap={8}>
          <Text size={24} weight="bold">
            Удаление отдела
          </Text>
          <Text color="text-tertiary">
            Вы точно хотите удалить отдел &rdquo;{department.name}&quot;?
          </Text>
        </VStack>
        <HStack gap={16} justify="end">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button disabled={isLoading} onClick={onDelete}>
            {isLoading ? 'Удаление...' : 'Удалить'}
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );
};
