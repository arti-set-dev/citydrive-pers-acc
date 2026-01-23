import { getRouteAuth } from '@/shared/lib/router/paths';
import { LoginForm } from '../../model/types/login';
import { baseApi } from '@/shared/api/baseApi';
import { Employee } from '@/entities/Employee';

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Employee & { token: string }, LoginForm>({
      query: (data) => ({
        url: getRouteAuth(),
        method: 'post',
        data,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
