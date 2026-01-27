import { baseApi } from '@/shared/api/baseApi';

export const deleteDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteDepartment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'delete',
      }),
      invalidatesTags: [{ type: 'Department', id: 'LIST' }],
    }),
  }),
});

export const { useDeleteDepartmentMutation } = deleteDepartmentApi;
