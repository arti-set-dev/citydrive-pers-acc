import { screen, fireEvent } from '@testing-library/react';
import { AddBalance } from './AddBalance';
import { useGetBalanceQuery } from '../../api/balanceApi';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';

jest.mock('../../api/balanceApi');
const mockedUseGetBalanceQuery = useGetBalanceQuery as jest.Mock;

jest.mock('../AddBalanceForm/AddBalanceForm', () => ({
  AddBalanceForm: () => (
    <div data-testid="add-balance-form-mock">Form Content</div>
  ),
}));

describe('AddBalance', () => {
  test('отображает состояние загрузки', () => {
    mockedUseGetBalanceQuery.mockReturnValue({ isLoading: true });

    render(<AddBalance id="1" />);

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  test('отображает баланс при успешной загрузке', () => {
    mockedUseGetBalanceQuery.mockReturnValue({
      data: { balance: 1500 },
      isLoading: false,
    });

    render(<AddBalance id="1" />);

    expect(screen.getByText('1500 р')).toBeInTheDocument();
    expect(screen.getByText('Баланс:')).toBeInTheDocument();
  });

  test('открывает модалку с формой при клике на кнопку пополнения', () => {
    mockedUseGetBalanceQuery.mockReturnValue({
      data: { balance: 0 },
      isLoading: false,
    });

    render(<AddBalance id="1" />);

    const openBtn = screen.getByText('Пополнить баланс');
    fireEvent.click(openBtn);

    expect(screen.getByTestId('add-balance-form-mock')).toBeInTheDocument();
  });

  test('не запрашивает баланс, если id не передан (skipToken)', () => {
    mockedUseGetBalanceQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    render(<AddBalance />);

    expect(screen.getByText('Баланс:')).toBeInTheDocument();

    expect(screen.getByText(/р/i)).toBeInTheDocument();
  });

  test('закрывает модалку (форма исчезает из DOM)', () => {
    mockedUseGetBalanceQuery.mockReturnValue({
      data: { balance: 0 },
      isLoading: false,
    });

    render(<AddBalance id="1" />);

    fireEvent.click(screen.getByText('Пополнить баланс'));
    expect(screen.getByTestId('add-balance-form-mock')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('modal-overlay'));

    expect(
      screen.queryByTestId('add-balance-form-mock'),
    ).not.toBeInTheDocument();
  });
});
