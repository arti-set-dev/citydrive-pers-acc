import { Employee } from '@/entities/Employee';
import { baseApi } from '@/shared/api/baseApi';

export const addNewEmployeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation<Employee, Partial<Employee>>({
      query: (employee) => ({
        url: '/employees',
        method: 'POST',
        data: employee,
      }),
    }),
  }),
});

export const { useCreateEmployeeMutation } = addNewEmployeeApi;
