import { baseApi } from '@/shared/api/baseApi';
import { Invoice } from '../model/types/invoice';

export interface GetInvoicesArgs {
  targetIds?: string[];
  companyId?: string;
  search?: string;
  _page?: number;
  _limit?: number;
  isMobile?: boolean;
}

export type InvoiceArrayResponse = Invoice[] & {
  totalCount?: number;
  totalPages?: number;
};

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<InvoiceArrayResponse, GetInvoicesArgs>({
      query: ({ targetIds, companyId, search, _page = 1, _limit = 10 }) => ({
        url: '/invoices',
        method: 'get',
        params: {
          companyId: companyId || undefined,
          employeeId: !companyId ? targetIds : undefined,
          title_like: search || undefined,
          _page,
          _limit,
        },
      }),
      transformResponse: (
        data: Invoice[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        meta: any,
        arg,
      ): InvoiceArrayResponse => {
        const totalCount = Number(meta?.headers?.['x-total-count']) || 0;
        const limit = arg._limit || 10;
        const result = [...data] as InvoiceArrayResponse;
        result.totalCount = totalCount;
        result.totalPages = Math.ceil(totalCount / limit) || 1;
        return result;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { isMobile, _page, targetIds, companyId, search } = queryArgs;

        const targetKey = companyId
          ? `comp_${companyId}`
          : [...(targetIds || [])].sort().join(',');

        const filterKey = `${targetKey}_${search || ''}`;

        if (isMobile) {
          return `${endpointName}_mobile_${filterKey}`;
        }
        return `${endpointName}_desktop_${filterKey}_page_${_page || 1}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!arg.isMobile || arg._page === 1) return newItems;
        const merged = [...currentCache, ...newItems] as InvoiceArrayResponse;
        merged.totalCount = newItems.totalCount;
        merged.totalPages = newItems.totalPages;
        return merged;
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?._page !== previousArg?._page ||
        currentArg?.search !== previousArg?.search ||
        currentArg?.companyId !== previousArg?.companyId,
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
