import { $api } from '@citydrive/shared/api/interceptors';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@citydrive/shared/api/baseApi';
import { editEmployeeApi } from './deleteEmployeeApi';

jest.mock('@citydrive/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as unknown as jest.Mock;

describe('editEmployeeApi', () => {
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

  test('deleteEmployee должен вызывать DELETE запрос с правильным ID в URL', async () => {
    const store = createTestStore();
    const employeeId = 'emp_999';

    mockedApi.mockResolvedValue({ data: null, headers: {} });

    await store.dispatch(
      editEmployeeApi.endpoints.deleteEmployee.initiate(employeeId),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `/employees/${employeeId}`,
        method: 'DELETE',
      }),
    );
  });

  test('должен возвращать ошибку при неудачном запросе (например, 404)', async () => {
    const store = createTestStore();

    mockedApi.mockRejectedValue({
      response: {
        status: 404,
        data: 'Not Found',
      },
    });

    const result = await store.dispatch(
      editEmployeeApi.endpoints.deleteEmployee.initiate('unknown_id'),
    );

    expect(result).toHaveProperty('error');
    expect(result.error).toMatchObject({
      status: 404,
      data: 'Not Found',
    });
  });
});
