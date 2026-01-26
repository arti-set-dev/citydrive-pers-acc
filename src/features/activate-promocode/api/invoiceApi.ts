import { baseApi } from '@/shared/api/baseApi';

export const promocodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkPromocode: builder.query<{ discount: number }, string>({
      query: (promoValue) => ({
        url: `/promocodes`,
        method: 'get',
        params: { value: promoValue },
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any[]) => {
        if (!response || response.length === 0) {
          throw { status: 404, data: { message: 'Not Found' } };
        }
        return response[0];
      },
    }),
  }),
});

export const { useLazyCheckPromocodeQuery } = promocodeApi;
