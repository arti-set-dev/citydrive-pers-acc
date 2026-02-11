/* eslint-disable @typescript-eslint/no-explicit-any */
import { routeApi } from './routeApi';
import { $api } from '@citydrive/shared/api/interceptors';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@citydrive/shared/api/baseApi';

jest.mock('@citydrive/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as jest.MockedFunction<typeof $api>;

describe('routeApi', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { [baseApi.reducerPath]: baseApi.reducer },
      middleware: (g) => g().concat(baseApi.middleware),
    });
    jest.clearAllMocks();
  });

  describe('getBillingInfo', () => {
    test('should transform array response to single object', async () => {
      const mockBilling = { id: 'b1', totalPrice: 1000 };
      mockedApi.mockResolvedValue({ data: [mockBilling], headers: {} });

      const result = await store.dispatch(
        routeApi.endpoints.getBillingInfo.initiate('trip-123'),
      );

      expect(result.data).toEqual(mockBilling);
      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          params: { tripId: 'trip-123' },
        }),
      );
    });
  });

  describe('getRoutes params mapping', () => {
    test('should map sort "-price" to _sort price and _order desc', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      await store.dispatch(
        routeApi.endpoints.getRoutes.initiate({
          employeeId: '1',
          sort: '-price',
        }),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            _sort: 'price',
            _order: 'desc',
          }),
        }),
      );
    });

    test('should map date filters correctly', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      await store.dispatch(
        routeApi.endpoints.getRoutes.initiate({
          employeeId: '1',
          startDate: '2023-01-01',
          endDate: '2023-01-31',
        }),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            date_gte: '2023-01-01',
            date_lte: '2023-01-31',
          }),
        }),
      );
    });
  });

  describe('getStops custom query string', () => {
    test('should format multiple IDs in query string manually', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      await store.dispatch(routeApi.endpoints.getStops.initiate(['s1', 's2']));

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/stops?id=s1&id=s2',
        }),
      );
    });
  });

  describe('Caching and Serialization', () => {
    test('mobile cache key should ignore _page', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      const args = { employeeId: '1', isMobile: true };
      await store.dispatch(
        routeApi.endpoints.getRoutes.initiate({ ...args, _page: 1 }),
      );
      await store.dispatch(
        routeApi.endpoints.getRoutes.initiate({ ...args, _page: 2 }),
      );

      const queries = store.getState().api.queries;
      const keys = Object.keys(queries).filter((k) =>
        k.startsWith('getRoutes'),
      );

      expect(keys).toHaveLength(1);
      expect(keys[0]).toContain('mobile');
    });
  });
});
