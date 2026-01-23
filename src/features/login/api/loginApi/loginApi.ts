import { getRouteAuth } from '@/shared/lib/router/paths';
import { LoginForm } from '../../model/types/login';
import { baseApi } from '@/shared/api/baseApi';

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, LoginForm>({
      query: (data) => ({
        url: getRouteAuth(),
        method: 'post',
        data,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
