import { Department } from '@/entities/Department';
import { baseApi } from '@/shared/api/baseApi';

export const editDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateDepartment: builder.mutation<
      Department,
      Partial<Department> & { id: string }
    >({
      query: ({ id, ...patch }) => ({
        url: `/departments/${id}`,
        method: 'PATCH',
        data: patch,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Department', id },
        { type: 'Department', id: 'LIST' },
      ],
    }),
  }),
});

export const { useUpdateDepartmentMutation } = editDepartmentApi;
