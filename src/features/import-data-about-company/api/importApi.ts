import { Department } from '@/entities/Department';
import { Employee } from '@/entities/Employee';
import { baseApi } from '@/shared/api/baseApi';

export const importApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (dept) => ({ url: '/departments', method: 'POST', data: dept }),
    }),
    createEmployee: builder.mutation({
      query: (emp) => ({ url: '/employees', method: 'POST', data: emp }),
    }),
    getCompanyEmployees: builder.query<Employee[], string>({
      query: (companyId) => ({
        url: '/employees',
        params: { companyId },
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Employee' as const, id })),
              { type: 'Employee', id: 'LIST' },
            ]
          : [{ type: 'Employee', id: 'LIST' }],
    }),
    updateDepartment: builder.mutation<
      Department,
      { id: string } & Partial<Department>
    >({
      query: ({ id, ...patch }) => ({
        url: `/departments/${id}`,
        method: 'PATCH',
        data: patch,
      }),
      invalidatesTags: ['Employee'],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createAuthData: builder.mutation<{ id: string; email: string }, any>({
      query: (authData) => ({
        url: '/auth-data',
        method: 'POST',
        data: authData,
      }),
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useCreateEmployeeMutation,
  useGetCompanyEmployeesQuery,
  useUpdateDepartmentMutation,
  useCreateAuthDataMutation,
} = importApi;
