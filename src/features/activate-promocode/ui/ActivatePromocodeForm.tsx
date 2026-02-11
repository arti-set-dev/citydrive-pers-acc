import { getFlex } from '@citydrive/shared/lib/stack/flex/getFlex';
import { Button } from '@citydrive/shared/ui/Button/Button';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { Field } from '@citydrive/shared/ui/Field/Field';
import { Modal } from '@citydrive/shared/ui/Modal/Modal';
import { VStack } from '@citydrive/shared/ui/Stack';
import { Text } from '@citydrive/shared/ui/Text/Text';
import { useState } from 'react';
import { useLazyCheckPromocodeQuery } from '../api/promocodeApi';

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
          data-testid="promo-input"
        />
        <Button
          offset={8}
          type="submit"
          disabled={isFetching}
          data-testid="promo-submit-btn"
        >
          {isFetching ? '...' : 'Отправить'}
        </Button>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <VStack gap={16} align="center">
          <Text as="h2" weight="medium">
            Статус активации
          </Text>
          <Text data-testid="promo-result-message">{modalMessage}</Text>
          <Button onClick={() => setIsModalOpen(false)}>Отлично</Button>
        </VStack>
      </Modal>
    </>
  );
};
