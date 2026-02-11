import { baseApi } from '@citydrive/shared/api/baseApi';
import { Department } from '../model/types/department';

export interface GetDepartmentsArgs {
  companyId?: string;
  name?: string;
  _page?: number;
  _limit?: number;
  isMobile?: boolean;
}

export type DepartmentArrayResponse = Department[] & {
  totalCount?: number;
  totalPages?: number;
};

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentById: builder.query<Department, string>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'Department', id }],
    }),

    getDepartments: builder.query<DepartmentArrayResponse, GetDepartmentsArgs>({
      query: ({ companyId, name, _page = 1, _limit = 10 }) => ({
        url: '/departments',
        method: 'GET',
        params: {
          companyId,
          name_like: name,
          _page,
          _limit,
        },
      }),
      transformResponse: (
        data: Department[],
        meta: { headers: Record<string, string> } | undefined,
        arg: GetDepartmentsArgs,
      ): DepartmentArrayResponse => {
        const totalCount = Number(meta?.headers?.['x-total-count']) || 0;
        const limit = arg._limit || 10;

        const result = [...data] as DepartmentArrayResponse;
        result.totalCount = totalCount;
        result.totalPages = Math.ceil(totalCount / limit) || 1;

        return result;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (queryArgs.isMobile) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { _page, ...rest } = queryArgs;
          return `${endpointName}_mobile_${JSON.stringify(rest)}`;
        }
        return `${endpointName}_desktop_${JSON.stringify(queryArgs)}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!arg.isMobile || arg._page === 1) {
          return newItems;
        }
        const merged = [
          ...currentCache,
          ...newItems,
        ] as DepartmentArrayResponse;
        merged.totalCount = newItems.totalCount;
        merged.totalPages = newItems.totalPages;
        return merged;
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?._page !== previousArg?._page ||
          currentArg?.name !== previousArg?.name ||
          currentArg?.isMobile !== previousArg?.isMobile
        );
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Department' as const, id })),
              { type: 'Department', id: 'LIST' },
            ]
          : [{ type: 'Department', id: 'LIST' }],
    }),
  }),
});

export const { useGetDepartmentsQuery, useGetDepartmentByIdQuery } =
  departmentApi;
