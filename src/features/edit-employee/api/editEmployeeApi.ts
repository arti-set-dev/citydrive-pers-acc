import { Employee } from '@/entities/Employee';
import { baseApi } from '@/shared/api/baseApi';

export const editEmployeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateEmployee: build.mutation<Employee, Partial<Employee>>({
      query: ({ id, ...patch }) => ({
        url: `/employees/${id}`,
        method: 'PATCH',
        data: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Employee', id },
        { type: 'Employee', id: 'LIST' },
      ],
    }),
    getEmployeeById: build.query<Employee, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Employee', id }],
    }),
  }),
});

export const { useUpdateEmployeeMutation, useGetEmployeeByIdQuery } =
  editEmployeeApi;
