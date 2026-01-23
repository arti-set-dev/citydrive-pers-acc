import { baseApi } from '@/shared/api/baseApi';
import { Balance } from '../model/types/types';

export const balanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query<Balance, string>({
      query: (userId) => ({
        url: `/employees/${userId}`,
        method: 'get',
      }),
    }),
  }),
});

export const { useGetBalanceQuery } = balanceApi;
