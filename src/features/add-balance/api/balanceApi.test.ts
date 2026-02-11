import { balanceApi } from './balanceApi';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@citydrive/shared/api/baseApi';
import { $api } from '@citydrive/shared/api/interceptors';
import { AddBalanceRequest } from '../model/types/types';

jest.mock('@citydrive/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as jest.MockedFunction<typeof $api>;

describe('balanceApi', () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
      },
      middleware: (getDefault) => getDefault().concat(baseApi.middleware),
    });

  beforeEach(() => {
    mockedApi.mockClear();
  });

  describe('getBalance', () => {
    test('формирует правильный GET запрос для получения баланса', async () => {
      const store = createTestStore();
      const mockBalance = { amount: 1000, currency: 'RUB' };

      mockedApi.mockResolvedValue({ data: mockBalance, headers: {} });

      const result = await store.dispatch(
        balanceApi.endpoints.getBalance.initiate('user-123'),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/employees/user-123',
          method: 'get',
        }),
      );
      expect(result.data).toEqual(mockBalance);
    });
  });

  describe('addBalance', () => {
    test('формирует правильный POST запрос для пополнения', async () => {
      const store = createTestStore();
      const payload: AddBalanceRequest = {
        employeeId: 'user-123',
        amount: '500',
        title: 'Пополнение баланса',
      };

      mockedApi.mockResolvedValue({ data: {}, headers: {} });

      const result = await store.dispatch(
        balanceApi.endpoints.addBalance.initiate(payload),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/invoices',
          method: 'POST',
          data: payload,
        }),
      );
      expect(result).not.toHaveProperty('error');
    });

    test('обрабатывает ошибку при неудачном пополнении', async () => {
      const store = createTestStore();

      mockedApi.mockRejectedValue({
        response: { status: 400, data: { message: 'Invalid amount' } },
      });

      const result = await store.dispatch(
        balanceApi.endpoints.addBalance.initiate({
          employeeId: '1',
          amount: '100',
          title: 'balance',
        }),
      );

      expect(result.error).toMatchObject({
        status: 400,
        data: { message: 'Invalid amount' },
      });
    });
  });
});
