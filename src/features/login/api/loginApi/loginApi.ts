import { LoginForm } from '../../model/types/login';
import { baseApi } from '@/shared/api/baseApi';
import { Employee } from '@/entities/Employee';

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Employee & { token: string }, LoginForm>({
      query: (data) => ({
        url: '/auth',
        method: 'post',
        data,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: builder.mutation<any, any>({
      query: (data) => ({
        url: '/auth/register',
        method: 'post',
        data,
      }),
    }),
    refreshToken: builder.mutation<
      { accessToken: string; refreshToken: string },
      { refreshToken: string }
    >({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'post',
        data,
      }),
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'post',
        data,
      }),
    }),
    resetPassword: builder.mutation<
      { success: boolean },
      { email: string; code: string; password?: string }
    >({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'post',
        data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = loginApi;
