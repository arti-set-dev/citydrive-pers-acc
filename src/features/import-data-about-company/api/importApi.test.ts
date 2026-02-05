import { $api } from '@/shared/api/interceptors';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import { importApi } from './importApi';

jest.mock('@/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as unknown as jest.Mock;

describe('importApi', () => {
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

  test('createDepartment отправляет корректный POST запрос', async () => {
    const store = createTestStore();
    const deptData = { name: 'New Dept' };
    mockedApi.mockResolvedValue({
      data: { id: '1', ...deptData },
      headers: {},
    });

    await store.dispatch(
      importApi.endpoints.createDepartment.initiate(deptData),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/departments',
        method: 'POST',
        data: deptData,
      }),
    );
  });

  test('getCompanyEmployees передает companyId в query params', async () => {
    const store = createTestStore();
    const companyId = 'comp_123';
    mockedApi.mockResolvedValue({ data: [], headers: {} });

    await store.dispatch(
      importApi.endpoints.getCompanyEmployees.initiate(companyId),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/employees',
        method: 'GET',
        params: { companyId },
      }),
    );
  });

  test('updateDepartment формирует правильный URL и очищает тело от ID', async () => {
    const store = createTestStore();
    const updatePayload = { id: 'dept_777', name: 'Updated Name' };
    mockedApi.mockResolvedValue({ data: updatePayload, headers: {} });

    await store.dispatch(
      importApi.endpoints.updateDepartment.initiate(updatePayload),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/departments/dept_777',
        method: 'PATCH',
        data: { name: 'Updated Name' },
      }),
    );
  });

  test('createAuthData отправляет произвольные данные авторизации', async () => {
    const store = createTestStore();
    const authData = { email: 'test@test.ru', password: '123' };
    mockedApi.mockResolvedValue({
      data: { id: 'auth_1', email: 'test@test.ru' },
      headers: {},
    });

    await store.dispatch(importApi.endpoints.createAuthData.initiate(authData));

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/auth-data',
        method: 'POST',
        data: authData,
      }),
    );
  });
});
