/* eslint-disable @typescript-eslint/no-explicit-any */
import { departmentApi } from './departmentApi';
import { $api } from '@/shared/api/interceptors';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';

jest.mock('@/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as jest.MockedFunction<typeof $api>;

describe('departmentApi', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { [baseApi.reducerPath]: baseApi.reducer },
      middleware: (g) => g().concat(baseApi.middleware),
    });
    jest.clearAllMocks();
  });

  test('getDepartmentById should make correct request', async () => {
    mockedApi.mockResolvedValue({ data: { id: '1', name: 'IT' }, headers: {} });

    await store.dispatch(
      departmentApi.endpoints.getDepartmentById.initiate('1'),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/departments/1',
        method: 'GET',
      }),
    );
  });

  describe('getDepartments transformation', () => {
    test('should transform response with pagination headers', async () => {
      const mockData = [{ id: '1', name: 'IT' }];
      mockedApi.mockResolvedValue({
        data: mockData,
        headers: { 'x-total-count': '25' },
      });

      const result = await store.dispatch(
        departmentApi.endpoints.getDepartments.initiate({
          _limit: 10,
          _page: 1,
        }),
      );

      expect(result.data?.totalCount).toBe(25);
      expect(result.data?.totalPages).toBe(3);
    });
  });

  describe('merge and mobile logic', () => {
    test('should merge data when isMobile is true and page > 1', async () => {
      mockedApi.mockResolvedValue({ data: [{ id: '1' }], headers: {} });
      await store.dispatch(
        departmentApi.endpoints.getDepartments.initiate({
          isMobile: true,
          _page: 1,
        }),
      );

      mockedApi.mockResolvedValue({ data: [{ id: '2' }], headers: {} });
      const result = await store.dispatch(
        departmentApi.endpoints.getDepartments.initiate({
          isMobile: true,
          _page: 2,
        }),
      );

      expect(result.data).toHaveLength(2);
      expect(result.data?.[0].id).toBe('1');
      expect(result.data?.[1].id).toBe('2');
    });

    test('should NOT merge data when isMobile is false (desktop)', async () => {
      mockedApi.mockResolvedValue({ data: [{ id: '1' }], headers: {} });
      await store.dispatch(
        departmentApi.endpoints.getDepartments.initiate({ _page: 1 }),
      );

      mockedApi.mockResolvedValue({ data: [{ id: '2' }], headers: {} });
      const result = await store.dispatch(
        departmentApi.endpoints.getDepartments.initiate({ _page: 2 }),
      );

      expect(result.data).toHaveLength(1);
      expect(result.data?.[0].id).toBe('2');
    });
  });

  test('serializeQueryArgs should distinguish mobile and desktop cache', async () => {
    mockedApi.mockResolvedValue({ data: [], headers: {} });

    await store.dispatch(
      departmentApi.endpoints.getDepartments.initiate({
        isMobile: true,
        _page: 1,
      }),
    );
    await store.dispatch(
      departmentApi.endpoints.getDepartments.initiate({
        isMobile: true,
        _page: 2,
      }),
    );

    const queries = store.getState().api.queries;
    const departmentQueryKeys = Object.keys(queries).filter((key) =>
      key.startsWith('getDepartments'),
    );

    expect(departmentQueryKeys).toHaveLength(1);
    expect(departmentQueryKeys[0]).toContain('mobile');
  });
  test('serializeQueryArgs: desktop requests should have different cache keys', async () => {
    mockedApi.mockResolvedValue({ data: [], headers: {} });

    await store.dispatch(
      departmentApi.endpoints.getDepartments.initiate({
        isMobile: false,
        _page: 1,
      }),
    );
    await store.dispatch(
      departmentApi.endpoints.getDepartments.initiate({
        isMobile: false,
        _page: 2,
      }),
    );

    const queries = store.getState().api.queries;
    const departmentQueryKeys = Object.keys(queries).filter((key) =>
      key.startsWith('getDepartments'),
    );

    expect(departmentQueryKeys).toHaveLength(2);
    expect(departmentQueryKeys[0]).toContain('desktop');
  });
});
