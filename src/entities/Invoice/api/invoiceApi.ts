import { baseApi } from '@/shared/api/baseApi';
import { Invoice } from '../model/types/invoice';

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<Invoice[], string>({
      query: (employeeId) => ({
        url: '/invoices',
        method: 'get',
        params: { employeeId },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Invoice' as const, id })),
              { type: 'Invoice', id: 'LIST' },
            ]
          : [{ type: 'Invoice', id: 'LIST' }],
    }),
  }),
});

export const { useGetInvoicesQuery } = invoiceApi;
