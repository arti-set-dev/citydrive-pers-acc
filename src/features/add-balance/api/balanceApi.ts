import { baseApi } from '@/shared/api/baseApi';
import { AddBalanceRequest, Balance } from '../model/types/types';

export const balanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query<Balance, string>({
      query: (userId) => ({
        url: `/employees/${userId}`,
        method: 'get',
      }),
      providesTags: (result, error, userId) => [
        { type: 'Balance', id: userId },
      ],
    }),
    addBalance: builder.mutation<void, AddBalanceRequest>({
      query: (body) => ({
        url: '/invoices',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: (result, error, { employeeId }) => [
        { type: 'Balance', id: employeeId },
      ],
    }),
  }),
});

export const { useGetBalanceQuery, useAddBalanceMutation } = balanceApi;
