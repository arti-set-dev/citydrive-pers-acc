import { baseApi } from '@/shared/api/baseApi';
import { Invoice } from '../model/types/invoice';

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<
      Invoice[],
      { targetIds: string[]; search?: string }
    >({
      query: ({ targetIds, search }) => ({
        url: '/invoices',
        method: 'get',
        params: {
          employeeId: targetIds,
          title_like: search || undefined,
        },
      }),
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
