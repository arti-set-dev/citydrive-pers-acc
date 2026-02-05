/* eslint-disable @typescript-eslint/no-explicit-any */
import { invoiceApi } from './invoiceApi';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import { $api } from '@/shared/api/interceptors';

jest.mock('@/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as jest.MockedFunction<typeof $api>;

describe('invoiceApi', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { [baseApi.reducerPath]: baseApi.reducer },
      middleware: (g) => g().concat(baseApi.middleware),
    });
    jest.clearAllMocks();
  });

  describe('query params logic', () => {
    test('should use companyId if provided', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      await store.dispatch(
        invoiceApi.endpoints.getInvoices.initiate({
          companyId: 'comp-1',
          targetIds: ['emp-1'],
        }),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            companyId: 'comp-1',
            employeeId: undefined,
          }),
        }),
      );
    });

    test('should use employeeId (targetIds) if companyId is missing', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      const targetIds = ['emp-1', 'emp-2'];
      await store.dispatch(
        invoiceApi.endpoints.getInvoices.initiate({ targetIds }),
      );

      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            companyId: undefined,
            employeeId: targetIds,
          }),
        }),
      );
    });
  });

  describe('serializeQueryArgs', () => {
    test('should produce same key for same targetIds in different order', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      await store.dispatch(
        invoiceApi.endpoints.getInvoices.initiate({
          targetIds: ['A', 'B'],
          isMobile: true,
        }),
      );
      await store.dispatch(
        invoiceApi.endpoints.getInvoices.initiate({
          targetIds: ['B', 'A'],
          isMobile: true,
        }),
      );

      const queries = store.getState().api.queries;
      const keys = Object.keys(queries).filter((k) =>
        k.startsWith('getInvoices'),
      );

      expect(keys).toHaveLength(1);
      expect(keys[0]).toContain('A,B');
    });

    test('should distinguish mobile and desktop keys', async () => {
      mockedApi.mockResolvedValue({ data: [], headers: {} });

      await store.dispatch(
        invoiceApi.endpoints.getInvoices.initiate({ isMobile: true }),
      );
      await store.dispatch(
        invoiceApi.endpoints.getInvoices.initiate({ isMobile: false }),
      );

      const queries = store.getState().api.queries;
      const keys = Object.keys(queries).filter((k) =>
        k.startsWith('getInvoices'),
      );

      expect(keys).toHaveLength(2);
      expect(keys.some((k) => k.includes('mobile'))).toBeTruthy();
      expect(keys.some((k) => k.includes('desktop'))).toBeTruthy();
    });
  });

  describe('merge logic', () => {
    test('should merge data when isMobile is true', async () => {
      mockedApi.mockResolvedValueOnce({ data: [{ id: 'inv-1' }], headers: {} });
      await store.dispatch(
        invoiceApi.endpoints.getInvoices.initiate({ isMobile: true, _page: 1 }),
      );

      mockedApi.mockResolvedValueOnce({ data: [{ id: 'inv-2' }], headers: {} });
      const result = await store.dispatch(
        invoiceApi.endpoints.getInvoices.initiate({ isMobile: true, _page: 2 }),
      );

      expect(result.data).toHaveLength(2);
      expect(result.data[0].id).toBe('inv-1');
      expect(result.data[1].id).toBe('inv-2');
    });
  });
});
