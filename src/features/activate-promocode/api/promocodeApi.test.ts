import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import { $api } from '@/shared/api/interceptors';
import { promocodeApi } from './promocodeApi';

jest.mock('@/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as jest.MockedFunction<typeof $api>;

describe('promocodeApi', () => {
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

  test('checkPromocode формирует правильный запрос', async () => {
    const store = createTestStore();

    mockedApi.mockResolvedValue({
      data: [{ discount: 500 }],
      headers: {},
    });

    await store.dispatch(
      promocodeApi.endpoints.checkPromocode.initiate('PROMO100'),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/promocodes',
        method: 'get',
        params: { value: 'PROMO100' },
      }),
    );
  });

  test('transformResponse корректно извлекает объект из массива', async () => {
    const store = createTestStore();
    mockedApi.mockResolvedValue({ data: [{ discount: 300 }] });

    const result = await store.dispatch(
      promocodeApi.endpoints.checkPromocode.initiate('SALE300'),
    );

    expect(result.data).toEqual({ discount: 300 });
  });

  test('transformResponse выбрасывает ошибку, если массив пустой', async () => {
    const store = createTestStore();
    mockedApi.mockResolvedValue({ data: [] });

    const result = await store.dispatch(
      promocodeApi.endpoints.checkPromocode.initiate('NON_EXISTENT'),
    );

    expect(result.isError).toBe(true);
    expect(result.error).toEqual({
      status: 404,
      data: { message: 'Not Found' },
    });
  });
});
