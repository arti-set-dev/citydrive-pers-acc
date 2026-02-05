import { screen, fireEvent, waitFor } from '@testing-library/react';
import { AddBalanceForm } from './AddBalanceForm';
import { useAddBalanceMutation } from '../../api/balanceApi';
import { render } from '@/shared/utils/jest/providers/JestProvider';
import userEvent from '@testing-library/user-event';

jest.mock('../../api/balanceApi');
const mockedAddBalance = useAddBalanceMutation as jest.Mock;

jest.mock('@/shared/ui/DatePicker/DatePicker', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DatePicker: ({ onChange, error }: any) => (
    <div>
      <button
        data-testid="mock-datepicker-trigger"
        onClick={() =>
          onChange({
            from: new Date('2023-10-10'),
            to: new Date('2023-10-20'),
          })
        }
      >
        Select Dates
      </button>
      {error && <span>{error}</span>}
    </div>
  ),
}));

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
jest.mock('@react-pdf/renderer', () => ({
  pdf: () => ({ toBlob: jest.fn().mockResolvedValue(new Blob()) }),
}));
jest.mock('@/entities/Invoice', () => ({
  InvoiceDocument: () => <div data-testid="pdf-doc" />,
}));

describe('AddBalanceForm', () => {
  const addBalanceTrigger = jest.fn();
  const initialState = {
    employee: {
      data: { id: 'emp_123', name: 'Roman' },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAddBalance.mockReturnValue([addBalanceTrigger, { isLoading: false }]);
    addBalanceTrigger.mockReturnValue({ unwrap: () => Promise.resolve() });
  });

  test('успешная отправка формы и вызов мутации', async () => {
    const user = userEvent.setup();
    render(<AddBalanceForm />, { initialState });

    const amountInput = screen.getByPlaceholderText('Сумма');
    await user.type(amountInput, '5000');
    fireEvent.blur(amountInput);

    const dateTrigger = screen.getByTestId('mock-datepicker-trigger');
    await user.click(dateTrigger);

    const submitBtn = screen.getByTestId('add-balance-submit');
    await waitFor(() => expect(submitBtn).not.toBeDisabled());

    await user.click(submitBtn);

    await waitFor(() => {
      expect(addBalanceTrigger).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: '5000',
          employeeId: 'emp_123',
        }),
      );
    });
  });

  test('валидация показывает ошибки при пустых полях', async () => {
    const user = userEvent.setup();
    render(<AddBalanceForm />, { initialState });

    const amountInput = screen.getByPlaceholderText('Сумма');

    await user.click(amountInput);
    await user.tab();

    await user.type(amountInput, '1');
    await user.clear(amountInput);
    fireEvent.blur(amountInput);

    expect(await screen.findByText(/Введите сумму/i)).toBeInTheDocument();
  });
});
