import { baseApi } from '@/shared/api/baseApi';
import { Department } from '../model/types/department';

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentById: builder.query<Department, string>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'Department', id }],
    }),
    getDepartments: builder.query<
      Department[],
      { companyId?: string; name?: string }
    >({
      query: ({ companyId, name }) => ({
        url: '/departments',
        method: 'GET',
        params: { companyId, name_like: name },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Department' as const, id })),
              { type: 'Department', id: 'LIST' },
            ]
          : [{ type: 'Department', id: 'LIST' }],
    }),
  }),
});

export const { useGetDepartmentsQuery, useGetDepartmentByIdQuery } =
  departmentApi;
