import { baseApi } from '@/shared/api/baseApi';
import { Employee } from '../model/types/employee';

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployeeData: build.query<Employee, string | null>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetEmployeeDataQuery } = employeeApi;
