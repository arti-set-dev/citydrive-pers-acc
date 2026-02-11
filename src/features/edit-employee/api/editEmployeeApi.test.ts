import { $api } from '@citydrive/shared/api/interceptors';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@citydrive/shared/api/baseApi';
import { editEmployeeApi } from './editEmployeeApi';
import { Employee } from '@citydrive/entities/Employee';

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

  describe('updateEmployee mutation', () => {
    test('должен отправлять PATCH запрос с ID в URL и патчем в body', async () => {
      const store = createTestStore();
      const patchData: Partial<Employee> & { id: string } = {
        id: 'emp_1',
        name: 'Иван Новый',
        role: 'admin',
      };

      mockedApi.mockResolvedValue({
        data: { ...patchData },
        headers: {},
      });

      await store.dispatch(
        editEmployeeApi.endpoints.updateEmployee.initiate(patchData),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/employees/emp_1',
          method: 'PATCH',
          data: {
            name: 'Иван Новый',
            role: 'admin',
          },
        }),
      );
    });
  });

  describe('getEmployeeById query', () => {
    test('должен отправлять GET запрос с ID в URL', async () => {
      const store = createTestStore();
      const employeeId = 'emp_1';

      mockedApi.mockResolvedValue({
        data: { id: 'emp_1', name: 'Иван' },
        headers: {},
      });

      await store.dispatch(
        editEmployeeApi.endpoints.getEmployeeById.initiate(employeeId),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/employees/emp_1',
          method: 'GET',
        }),
      );
    });

    test('должен корректно обрабатывать ошибку 404', async () => {
      const store = createTestStore();

      mockedApi.mockRejectedValue({
        response: { status: 404, data: 'Not Found' },
      });

      const result = await store.dispatch(
        editEmployeeApi.endpoints.getEmployeeById.initiate('wrong_id'),
      );

      expect(result.error).toMatchObject({
        status: 404,
        data: 'Not Found',
      });
    });
  });
});
