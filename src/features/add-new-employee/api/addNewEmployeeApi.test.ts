import { $api } from '@citydrive/shared/api/interceptors';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@citydrive/shared/api/baseApi';
import { addNewEmployeeApi } from './addNewEmployeeApi';
import { Employee } from '@citydrive/entities/Employee';

jest.mock('@citydrive/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as unknown as jest.Mock;

describe('addNewEmployeeApi', () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
      },
      middleware: (getDefault) => getDefault().concat(baseApi.middleware),
    });

  const mockEmployee: Partial<Employee> = {
    name: 'Иван Иванов',
    role: 'USER',
    companyId: 'comp_123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createEmployee mutation отправляет корректный POST запрос', async () => {
    const store = createTestStore();

    mockedApi.mockResolvedValue({
      data: { id: 'new_emp_1', ...mockEmployee },
      headers: {},
    });

    const result = await store.dispatch(
      addNewEmployeeApi.endpoints.createEmployee.initiate(mockEmployee),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/employees',
        method: 'POST',
        data: mockEmployee,
      }),
    );

    expect(result).toMatchObject({
      data: { id: 'new_emp_1', ...mockEmployee },
    });
  });

  test('обработка ошибки при неудачном создании сотрудника', async () => {
    const store = createTestStore();

    mockedApi.mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'Invalid employee data' },
      },
    });

    const result = await store.dispatch(
      addNewEmployeeApi.endpoints.createEmployee.initiate(mockEmployee),
    );

    expect(result).toHaveProperty('error');
    expect(result.error).toMatchObject({
      status: 400,
      data: { message: 'Invalid employee data' },
    });
  });
});
