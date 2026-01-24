import { getEmployeeData } from '@/entities/Employee';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { Field } from '@/shared/ui/Field/Field';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { DateRange } from 'react-day-picker';
import { Controller, useForm } from 'react-hook-form';
import { useAddBalanceMutation } from '../../api/balanceApi';
import { AddBalanceRequest } from '../../model/types/types';
import { Invoice } from '@/entities/Invoice';

interface IBalanceForm {
  period: DateRange | undefined;
  amount: string;
}

type BankData = Pick<Invoice, 'legalEntity' | 'INN' | 'bank' | 'BIC' | 'VAT'>;

const BANK_DATA: BankData = {
  bank: 'ПАО Сбербанк',
  BIC: 3838482929,
  INN: 6473743637,
  legalEntity: 'ООО Ситидрайв',
  VAT: 22,
};

export const AddBalanceForm = () => {
  const employeeData = useAppSelector(getEmployeeData);
  const [addBalance, { isLoading, isError }] = useAddBalanceMutation();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IBalanceForm>({
    mode: 'onChange',
    defaultValues: {
      period: undefined,
      amount: '',
    },
  });
  const onSubmit = async (data: IBalanceForm) => {
    const currentDate = new Date().toLocaleDateString('ru-RU');
    const payload: AddBalanceRequest = {
      ...BANK_DATA,
      amount: data.amount,
      employeeId: employeeData?.id,
      period: {
        from: data.period?.from
          ? new Date(data.period.from).toISOString()
          : undefined,
        to: data.period?.to
          ? new Date(data.period.to).toISOString()
          : undefined,
      },
      title: `Счёт от ${currentDate}`,
    };
    try {
      const [{ pdf }, { InvoiceDocument }, { saveAs }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/entities/Invoice'),
        import('file-saver'),
      ]);

      const blob = await pdf(
        <InvoiceDocument payload={payload as Invoice} />,
      ).toBlob();

      saveAs(blob, `Счёт_${payload.title}.pdf`);
      await addBalance(payload).unwrap();
    } catch (error) {
      console.error('Ошибка при отправке:', error);
    }
  };
  return (
    <VStack gap={24} as="form" onSubmit={handleSubmit(onSubmit)}>
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
      <Controller
        name="period"
        control={control}
        rules={{
          required: 'Выберите период',
          validate: (val) =>
            val?.from && val?.to ? true : 'Выберите обе даты периода',
        }}
        render={({ field, fieldState }) => (
          <DatePicker
            fullWidth
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="amount"
        control={control}
        rules={{ required: 'Введите сумму' }}
        render={({ field, fieldState }) => (
          <Field
            {...field}
            placeholder="Сумма"
            error={fieldState.error?.message}
            type="number"
            fullWidth
          />
        )}
      />

      <Button type="submit" disabled={!isValid || isLoading} offset={8}>
        {isLoading ? 'Формируем счёт...' : 'Скачать счёт в pdf'}
      </Button>
      {isError && (
        <Text color="danger">Возникла ошибка при отправке данных</Text>
      )}
    </VStack>
  );
};
