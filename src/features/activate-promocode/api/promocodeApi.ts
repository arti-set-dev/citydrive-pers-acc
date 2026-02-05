import { baseApi } from '@/shared/api/baseApi';

export const promocodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkPromocode: builder.query<{ discount: number }, string>({
      async queryFn(promoValue, _queryApi, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `/promocodes`,
          method: 'get',
          params: { value: promoValue },
        });

        if (result.error) return { error: result.error };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = result.data as any[];

        if (!data || data.length === 0) {
          return {
            error: { status: 404, data: { message: 'Not Found' } },
          };
        }

        return { data: data[0] };
      },
    }),
  }),
});

export const { useLazyCheckPromocodeQuery } = promocodeApi;
