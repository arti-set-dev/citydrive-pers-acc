import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';
import { Modal } from '@/shared/ui/Modal/Modal';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { useState } from 'react';
import { useLazyCheckPromocodeQuery } from '../api/invoiceApi';

const stack = getFlex({
  gap: 16,
  align: 'stretch',
  direction: { base: 'row', sm: 'column' },
});

export const ActivatePromocodeForm = () => {
  const [promoValue, setPromoValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [trigger, { isFetching }] = useLazyCheckPromocodeQuery();

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await trigger(promoValue);

    if (result.data) {
      setModalMessage(`Ура! Скидка ${result.data.discount} денег ваша.`);
    } else {
      setModalMessage('Увы, такого промокода не существует');
    }

    setPromoValue('');
    setIsModalOpen(true);
  };
  return (
    <>
      <Card
        as="form"
        p={16}
        onSubmit={handleApply}
        r={16}
        variant="bg-outline"
        className={stack.className}
        style={stack.style}
      >
        <Field
          value={promoValue}
          onChange={(v) => setPromoValue(v)}
          placeholder="Активировать прокод"
        />
        <Button offset={8} type="submit" disabled={isFetching}>
          {isFetching ? '...' : 'Отправить'}
        </Button>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <VStack gap={16} align="center">
          <Text as="h2" weight="medium">
            Статус активации
          </Text>
          <Text>{modalMessage}</Text>
          <Button onClick={() => setIsModalOpen(false)}>Отлично</Button>
        </VStack>
      </Modal>
    </>
  );
};
