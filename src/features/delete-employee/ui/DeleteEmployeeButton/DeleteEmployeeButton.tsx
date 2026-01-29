import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/shared/ui/Modal/Modal';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { getRouteEmployees } from '@/shared/lib/router/paths';
import { useDeleteEmployeeMutation } from '../../api/deleteEmployeeApi';
import { Button } from '@/shared/ui/Button/Button';

interface DeleteEmployeeButtonProps {
  id: string;
}

export const DeleteEmployeeButton = ({ id }: DeleteEmployeeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteEmployee, { isLoading }] = useDeleteEmployeeMutation();

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  const onDelete = async () => {
    try {
      await deleteEmployee(id).unwrap();
      setIsOpen(false);
      navigate(getRouteEmployees());
    } catch (e) {
      console.error('Ошибка при удалении:', e);
    }
  };

  return (
    <>
      <Button variant="clear" offset={8} onClick={onOpenModal}>
        Удалить сотрудника
      </Button>

      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <VStack gap={24} align="center">
          <Text size={24} weight="medium" align="center">
            Вы точно хотите удалить вашего сотрудника?
          </Text>
          <HStack gap={16} justify="center">
            <Button
              variant="outline"
              onClick={onCloseModal}
              disabled={isLoading}
            >
              Отмена
            </Button>
            <Button
              variant="primary"
              color="error"
              onClick={onDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Удаление...' : 'Удалить'}
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
};
