import { baseApi } from '@/shared/api/baseApi';
import { Department } from '../model/types/department';

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], string>({
      query: (companyId) => ({
        url: '/departments',
        method: 'GET',
        params: { companyId },
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

export const { useGetDepartmentsQuery } = departmentApi;
