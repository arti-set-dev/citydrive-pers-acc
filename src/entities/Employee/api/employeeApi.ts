import { baseApi } from '@/shared/api/baseApi';
import { Employee } from '../model/types/employee';

export interface GetEmployeesArgs {
  fields?: Array<keyof Employee>;
  companyId?: string;
  name_like?: string;
  role?: string;
  departmentId?: string;
  status?: string;
}

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployeeData: build.query<Employee, string | null>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
    }),

    getEmployeesList: build.query<Employee[], GetEmployeesArgs | void>({
      query: (args) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: Record<string, any> = {};

        if (args?.fields) params._fields = args.fields.join(',');
        if (args?.companyId) params.companyId = args.companyId;
        if (args?.name_like) params.name_like = args.name_like;

        const filterFields: Array<keyof GetEmployeesArgs> = [
          'role',
          'departmentId',
          'status',
        ];

        filterFields.forEach((field) => {
          const value = args?.[field];
          if (value && value !== 'all') {
            params[field] = value;
          }
        });

        return {
          url: '/employees',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: Employee[], meta, args) => {
        if (!args?.fields) return response;

        return response.map((employee) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const picked: any = { id: employee.id };
          args.fields?.forEach((key) => {
            picked[key] = employee[key];
          });
          return picked as Employee;
        });
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Employee' as const, id })),
              { type: 'Employee', id: 'LIST' },
            ]
          : [{ type: 'Employee', id: 'LIST' }],
    }),
  }),
});

export const { useGetEmployeeDataQuery, useGetEmployeesListQuery } =
  employeeApi;
