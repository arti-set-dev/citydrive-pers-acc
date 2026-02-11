import { Employee } from '@citydrive/entities/Employee';
import { baseApi } from '@citydrive/shared/api/baseApi';

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
