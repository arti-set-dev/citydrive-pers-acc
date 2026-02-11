import { baseApi } from '@citydrive/shared/api/baseApi';
import { Employee, EmployeeStats } from '../model/types/employee';

export interface GetEmployeesArgs {
  fields?: Array<keyof Employee>;
  companyId?: string;
  name_like?: string;
  role?: string;
  departmentId?: string;
  status?: string;
  _page?: number;
  _limit?: number;
  isMobile?: boolean;
}

export type EmployeeArrayResponse = Employee[] & {
  totalCount?: number;
  totalPages?: number;
};

interface UpdateFeatureFlagsOptions {
  employeeId: string;
  features: Partial<NonNullable<Employee['features']>>;
}

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployeeData: build.query<Employee, string | null>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
    }),

    getEmployeesList: build.query<
      EmployeeArrayResponse,
      GetEmployeesArgs | void
    >({
      query: (args) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: Record<string, any> = {};

        // Добавляем параметры только если они переданы
        if (args?._page) params._page = args._page;
        if (args?._limit) params._limit = args._limit;
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
      transformResponse: (
        response: Employee[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        meta: any,
        args: GetEmployeesArgs | void,
      ): EmployeeArrayResponse => {
        const totalCount = Number(meta?.headers?.['x-total-count']) || 0;
        const limit = args?._limit || 10;

        const data = args?.fields
          ? response.map((employee) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const picked: any = { id: employee.id };
              args.fields?.forEach((key) => {
                picked[key] = employee[key];
              });
              return picked as Employee;
            })
          : response;

        const result = [...data] as EmployeeArrayResponse;
        result.totalCount = totalCount;
        result.totalPages = Math.ceil(totalCount / limit) || 1;

        return result;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const args = queryArgs || {};

        if (!args.isMobile && !args._page) {
          return `${endpointName}_all_${JSON.stringify(args)}`;
        }

        if (args.isMobile) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { _page, ...rest } = args;
          return `${endpointName}_mobile_${JSON.stringify(rest)}`;
        }

        return `${endpointName}_desktop_${JSON.stringify(args)}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!arg?.isMobile || arg?._page === 1) {
          return newItems;
        }
        const merged = [...currentCache, ...newItems] as EmployeeArrayResponse;
        merged.totalCount = newItems.totalCount;
        merged.totalPages = newItems.totalPages;
        return merged;
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?._page !== previousArg?._page ||
          currentArg?.name_like !== previousArg?.name_like ||
          currentArg?.isMobile !== previousArg?.isMobile
        );
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Employee' as const, id })),
              { type: 'Employee', id: 'LIST' },
            ]
          : [{ type: 'Employee', id: 'LIST' }],
    }),
    getStats: build.query<
      EmployeeStats[],
      { employeeId: string; date?: string }
    >({
      query: ({ employeeId, date }) => ({
        url: '/stats',
        method: 'get',
        params: { employeeId, date },
      }),
    }),
    updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
      query: ({ employeeId, features }) => ({
        url: `/employees/${employeeId}`,
        method: 'PATCH',
        data: {
          features,
        },
      }),
    }),
  }),
});

export const {
  useGetEmployeeDataQuery,
  useGetEmployeesListQuery,
  useGetStatsQuery,
  useUpdateFeatureFlagsMutation,
} = employeeApi;
