import { Button } from '@/shared/ui/Button/Button';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { Field } from '@/shared/ui/Field/Field';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { useState } from 'react';

export const AddBalanceForm = () => {
  const [sumResult, setSumResult] = useState('');
  return (
    <VStack gap={24}>
      <Text as="h2" weight="bold" size={32}>
        Пополнение баланса
      </Text>
      <VStack gap={16}>
        <Text color="text-tertiary">
          Укажите период, за который платите. Сумма с НДС подсчитается сама, но
          можно указать другую.
        </Text>
        <Text color="text-tertiary">
          Затем скачайте счёт и оплатите его в любом банке. Деньги на баланс
          придут в течение трёх рабочих дней.
        </Text>
      </VStack>
      <DatePicker />
      <Field readOnly value={sumResult} placeholder="Сумма" />
      <Button offset={8}>Скачать счёт в pdf</Button>
    </VStack>
  );
};
