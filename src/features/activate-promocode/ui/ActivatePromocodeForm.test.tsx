import { screen, fireEvent, waitFor } from '@testing-library/react';
import { ActivatePromocodeForm } from './ActivatePromocodeForm';

jest.mock('../api/promocodeApi', () => ({
  ...jest.requireActual('../api/promocodeApi'),
  useLazyCheckPromocodeQuery: jest.fn(),
}));

import { useLazyCheckPromocodeQuery } from '../api/promocodeApi';
import { render } from '@/shared/utils/jest/providers/JestProvider';
const mockedQuery = useLazyCheckPromocodeQuery as jest.Mock;

describe('ActivatePromocodeForm', () => {
  const triggerMock = jest.fn();

  beforeEach(() => {
    mockedQuery.mockReturnValue([triggerMock, { isFetching: false }]);
  });

  test('обновляет значение инпута при вводе', () => {
    render(<ActivatePromocodeForm />);
    const input = screen.getByPlaceholderText(
      'Активировать прокод',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'SALE10' } });
    expect(input.value).toBe('SALE10');
  });

  test('показывает успех в модалке при валидном промокоде', async () => {
    triggerMock.mockResolvedValue({ data: { discount: 500 } });

    render(<ActivatePromocodeForm />);

    const input = screen.getByPlaceholderText('Активировать прокод');
    const submitBtn = screen.getByText('Отправить');

    fireEvent.change(input, { target: { value: 'SALE500' } });
    fireEvent.click(submitBtn);

    const message = await screen.findByText(/Скидка 500 денег ваша/i);
    expect(message).toBeInTheDocument();
  });

  test('показывает ошибку в модалке, если промокод не найден', async () => {
    triggerMock.mockResolvedValue({ data: null });

    render(<ActivatePromocodeForm />);

    fireEvent.change(screen.getByPlaceholderText('Активировать прокод'), {
      target: { value: 'WRONG' },
    });
    fireEvent.click(screen.getByText('Отправить'));

    const message = await screen.findByText(
      'Увы, такого промокода не существует',
    );
    expect(message).toBeInTheDocument();
  });

  test('меняет текст кнопки и блокирует её во время загрузки', () => {
    mockedQuery.mockReturnValue([triggerMock, { isFetching: true }]);

    render(<ActivatePromocodeForm />);

    const submitBtn = screen.getByRole('button', { name: '...' });
    expect(submitBtn).toBeDisabled();
  });

  test('закрывает модалку при клике на "Отлично"', async () => {
    triggerMock.mockResolvedValue({ data: { discount: 100 } });
    render(<ActivatePromocodeForm />);

    fireEvent.click(screen.getByText('Отправить'));

    const closeBtn = await screen.findByText('Отлично');
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText('Статус активации')).not.toBeInTheDocument();
    });
  });
});
