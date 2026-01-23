import { Button } from '@/shared/ui/Button/Button';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Flex, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { useState } from 'react';
import { AddBalanceForm } from '../AddBalanceForm/AddBalanceForm';
import { BrowserView, MobileView } from 'react-device-detect';
import { useGetBalanceQuery } from '../../api/balanceApi';
import { skipToken } from '@reduxjs/toolkit/query';

interface AddBalanceProps {
  id?: string;
}

export const AddBalance = ({ id }: AddBalanceProps) => {
  const [isOpenModalFormWithAddBalance, setIsOpenModalFormWithAddBalance] =
    useState(false);
  const onOpenModalFormWithAddBalance = () => {
    setIsOpenModalFormWithAddBalance(true);
  };

  const onCloseModalFormWithAddBalance = () => {
    setIsOpenModalFormWithAddBalance(false);
  };
  const { data, isLoading } = useGetBalanceQuery(id ?? skipToken);
  return (
    <HStack gap={4}>
      <Flex direction={{ base: 'row', sm: 'column' }}>
        <Text size={16} color="text-tertiary">
          Баланс:
        </Text>
        <Text size={18} weight="bold">
          {isLoading ? 'Загрузка...' : `${data?.balance} р`}
        </Text>
      </Flex>
      <MobileView>
        <Button onClick={onOpenModalFormWithAddBalance} variant="clear-brand">
          Пополнить
        </Button>
      </MobileView>
      <BrowserView>
        <Button onClick={onOpenModalFormWithAddBalance} variant="clear-brand">
          Пополнить баланс
        </Button>
      </BrowserView>
      <Modal
        isOpen={isOpenModalFormWithAddBalance}
        onClose={onCloseModalFormWithAddBalance}
      >
        <AddBalanceForm />
      </Modal>
    </HStack>
  );
};
