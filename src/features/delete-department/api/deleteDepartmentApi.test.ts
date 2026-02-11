import { $api } from '@citydrive/shared/api/interceptors';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@citydrive/shared/api/baseApi';
import { deleteDepartmentApi } from './deleteDepartmentApi';

jest.mock('@citydrive/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as unknown as jest.Mock;

describe('deleteDepartmentApi', () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
      },
      middleware: (getDefault) => getDefault().concat(baseApi.middleware),
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deleteDepartment должен отправлять DELETE запрос с правильным ID', async () => {
    const store = createTestStore();
    const departmentId = 'dept_123';

    mockedApi.mockResolvedValue({ data: null, headers: {} });

    await store.dispatch(
      deleteDepartmentApi.endpoints.deleteDepartment.initiate(departmentId),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `/departments/${departmentId}`,
        method: 'delete',
      }),
    );
  });

  test('должен возвращать ошибку при неудачном удалении', async () => {
    const store = createTestStore();

    mockedApi.mockRejectedValue({
      response: {
        status: 403,
        data: 'Forbidden',
      },
    });

    const result = await store.dispatch(
      deleteDepartmentApi.endpoints.deleteDepartment.initiate('forbidden_id'),
    );

    expect(result).toHaveProperty('error');
    expect(result.error).toMatchObject({
      status: 403,
      data: 'Forbidden',
    });
  });
});
