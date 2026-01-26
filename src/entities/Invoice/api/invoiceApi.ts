import { baseApi } from '@/shared/api/baseApi';
import { Invoice } from '../model/types/invoice';

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<Invoice[], string[]>({
      query: (employeeId) => {
        const params = Array.isArray(employeeId)
          ? { employeeId }
          : { employeeId };

        return {
          url: '/invoices',
          method: 'get',
          params,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Invoice' as const, id })),
              { type: 'Invoice', id: 'LIST' },
            ]
          : [{ type: 'Invoice', id: 'LIST' }],
    }),
    getCompanyEmployees: builder.query<void[], string>({
      query: (companyId) => ({
        url: '/employees',
        method: 'get',
        params: { companyId },
      }),
    }),
  }),
});

export const { useGetInvoicesQuery } = invoiceApi;
