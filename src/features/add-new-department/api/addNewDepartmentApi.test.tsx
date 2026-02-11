import { $api } from '@citydrive/shared/api/interceptors';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@citydrive/shared/api/baseApi';
import { addNewDepartmentApi } from './addNewDepartmentApi';
import { Department } from '@citydrive/entities/Department';

jest.mock('@citydrive/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as unknown as jest.Mock;

describe('addNewDepartmentApi', () => {
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

  test('createDepartment отправляет корректный запрос', async () => {
    const store = createTestStore();
    const newDepartment: Omit<Department, 'id'> = {
      name: 'IT',
      limit: 1000,
      spent: 0,
      employeesIds: [],
      companyId: 'company_1',
    };

    mockedApi.mockResolvedValue({
      data: { id: '1', ...newDepartment },
      headers: {},
    });

    const result = await store.dispatch(
      addNewDepartmentApi.endpoints.createDepartment.initiate(newDepartment),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/departments',
        method: 'POST',
        data: newDepartment,
      }),
    );

    expect(result.data).toEqual({ id: '1', ...newDepartment });
  });

  test('createDepartment обрабатывает ошибку сервера', async () => {
    const store = createTestStore();

    mockedApi.mockRejectedValue({
      response: { status: 500, data: 'Error' },
    });

    const result = await store.dispatch(
      addNewDepartmentApi.endpoints.createDepartment.initiate({
        name: 'IT',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any),
    );

    expect(result.error).toBeDefined();
    expect(result.error).toMatchObject({
      status: 500,
      data: 'Error',
    });
  });
});
