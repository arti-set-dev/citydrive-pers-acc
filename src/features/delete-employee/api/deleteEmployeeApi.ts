import { baseApi } from '@/shared/api/baseApi';

export const editEmployeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deleteEmployee: build.mutation<void, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Employee', id: 'LIST' }],
    }),
  }),
});

export const { useDeleteEmployeeMutation } = editEmployeeApi;
