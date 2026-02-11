/* eslint-disable @typescript-eslint/no-explicit-any */
import { employeeApi } from './employeeApi';
import { $api } from '@citydrive/shared/api/interceptors';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@citydrive/shared/api/baseApi';

jest.mock('@citydrive/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as jest.MockedFunction<typeof $api>;

describe('employeeApi', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { [baseApi.reducerPath]: baseApi.reducer },
      middleware: (g) => g().concat(baseApi.middleware),
    });
    jest.clearAllMocks();
  });

  describe('query params logic', () => {
    test('should filter out "all" values from params', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      await store.dispatch(
        employeeApi.endpoints.getEmployeesList.initiate({
          role: 'all',
          status: 'active',
          departmentId: 'dept-1',
        }),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.not.objectContaining({ role: 'all' }),
        }),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            status: 'active',
            departmentId: 'dept-1',
          }),
        }),
      );
    });

    test('should join fields array into string', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      await store.dispatch(
        employeeApi.endpoints.getEmployeesList.initiate({
          fields: ['name', 'role'],
        }),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({ _fields: 'name,role' }),
        }),
      );
    });
  });

  describe('transformResponse manual picking', () => {
    test('should pick only requested fields when fields arg is present', async () => {
      const fullEmployee = {
        id: '1',
        name: 'Ivan',
        role: 'admin',
        status: 'active',
      };
      mockedApi.mockResolvedValue({
        data: [fullEmployee],
        headers: { 'x-total-count': '1' },
      });

      const result = await store.dispatch(
        employeeApi.endpoints.getEmployeesList.initiate({ fields: ['role'] }),
      );

      expect(result.data?.[0]).toEqual({ id: '1', role: 'admin' });
      expect(result.data?.[0]).not.toHaveProperty('name');
    });
  });

  describe('cache and merge (mobile)', () => {
    test('mobile requests should use the same cache key for infinite scroll', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      await store.dispatch(
        employeeApi.endpoints.getEmployeesList.initiate({
          isMobile: true,
          _page: 1,
        }),
      );
      await store.dispatch(
        employeeApi.endpoints.getEmployeesList.initiate({
          isMobile: true,
          _page: 2,
        }),
      );

      const queries = store.getState().api.queries;
      const keys = Object.keys(queries).filter((k) =>
        k.startsWith('getEmployeesList'),
      );

      expect(keys).toHaveLength(1);
      expect(keys[0]).toContain('mobile');
    });

    test('should merge data correctly on mobile', async () => {
      mockedApi.mockResolvedValueOnce({ data: [{ id: '1' }], headers: {} });
      await store.dispatch(
        employeeApi.endpoints.getEmployeesList.initiate({
          isMobile: true,
          _page: 1,
        }),
      );

      mockedApi.mockResolvedValueOnce({ data: [{ id: '2' }], headers: {} });
      const result = await store.dispatch(
        employeeApi.endpoints.getEmployeesList.initiate({
          isMobile: true,
          _page: 2,
        }),
      );

      expect(result.data).toHaveLength(2);
      expect(result.data?.[0].id).toBe('1');
      expect(result.data?.[1].id).toBe('2');
    });
  });

  test('updateFeatureFlags should send PATCH request', async () => {
    mockedApi.mockResolvedValue({ data: {}, headers: {} });

    await store.dispatch(
      employeeApi.endpoints.updateFeatureFlags.initiate({
        employeeId: '123',
        features: { isExperimental: true },
      }),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/employees/123',
        method: 'PATCH',
        data: { features: { isExperimental: true } },
      }),
    );
  });
});
