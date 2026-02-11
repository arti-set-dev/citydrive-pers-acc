import { $api } from '@citydrive/shared/api/interceptors';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@citydrive/shared/api/baseApi';
import { editDepartmentApi } from './editDepartmentApi';

jest.mock('@citydrive/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as unknown as jest.Mock;

describe('editDepartmentApi', () => {
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

  test('updateDepartment должен отправлять PATCH запрос с ID в URL и данными в body', async () => {
    const store = createTestStore();
    const updateData = {
      id: 'dept_777',
      name: 'Новое название',
      limit: 5000,
    };

    mockedApi.mockResolvedValue({
      data: { ...updateData },
      headers: {},
    });

    await store.dispatch(
      editDepartmentApi.endpoints.updateDepartment.initiate(updateData),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/departments/dept_777',
        method: 'PATCH',
        data: {
          name: 'Новое название',
          limit: 5000,
        },
      }),
    );
  });

  test('должен корректно обрабатывать ошибку при обновлении', async () => {
    const store = createTestStore();

    mockedApi.mockRejectedValue({
      response: {
        status: 400,
        data: 'Bad Request',
      },
    });

    const result = await store.dispatch(
      editDepartmentApi.endpoints.updateDepartment.initiate({
        id: '1',
        name: 'Error',
      }),
    );

    expect(result).toHaveProperty('error');
    expect(result.error).toMatchObject({
      status: 400,
      data: 'Bad Request',
    });
  });
});
