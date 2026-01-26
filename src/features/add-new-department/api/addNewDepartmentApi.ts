import { Department } from '@/entities/Department';
import { baseApi } from '@/shared/api/baseApi';

export const addNewDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation<Department, Omit<Department, 'id'>>({
      query: (newDepartment) => ({
        url: '/departments',
        method: 'POST',
        data: newDepartment,
      }),
      invalidatesTags: [{ type: 'Department', id: 'LIST' }],
    }),
  }),
});

export const { useCreateDepartmentMutation } = addNewDepartmentApi;
