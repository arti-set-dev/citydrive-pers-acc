import { baseApi } from '@/shared/api/baseApi';

export interface RoutePathResponse {
  id: string;
  price: number;
  date: string;
  stopsIds: string[];
  employeeId: string;
}

export interface StopResponse {
  id: string;
  address: string;
  city: string;
  time: string;
  coords: [number, number];
}

export interface GetRoutesArgs {
  employeeId: string;
  date?: string;
  sort?: 'price' | '-price';
  startDate?: string;
  endDate?: string;
  _page?: number;
  _limit?: number;
  isMobile?: boolean;
}

export type RouteArrayResponse = RoutePathResponse[] & {
  totalCount?: number;
  totalPages?: number;
};

export const routeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRoutes: build.query<RouteArrayResponse, GetRoutesArgs>({
      query: ({
        employeeId,
        date,
        sort,
        startDate,
        endDate,
        _page = 1,
        _limit = 10,
      }) => ({
        url: '/routPaths',
        method: 'GET',
        params: {
          employeeId,
          date,
          date_gte: startDate,
          date_lte: endDate,
          _sort: sort ? 'price' : undefined,
          _order: sort === '-price' ? 'desc' : 'asc',
          _page,
          _limit,
        },
      }),
      transformResponse: (
        data: RoutePathResponse[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        meta: any,
        arg,
      ): RouteArrayResponse => {
        const totalCount = Number(meta?.headers?.['x-total-count']) || 0;
        const limit = arg._limit || 10;
        const result = [...data] as RouteArrayResponse;
        result.totalCount = totalCount;
        result.totalPages = Math.ceil(totalCount / limit) || 1;
        return result;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { isMobile, _page, ...filters } = queryArgs;
        const filterKey = JSON.stringify(filters);

        if (isMobile) {
          return `${endpointName}_mobile_${filterKey}`;
        }
        return `${endpointName}_desktop_${filterKey}_page_${_page || 1}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!arg.isMobile || arg._page === 1) return newItems;
        const merged = [...currentCache, ...newItems] as RouteArrayResponse;
        merged.totalCount = newItems.totalCount;
        merged.totalPages = newItems.totalPages;
        return merged;
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?._page !== previousArg?._page,
    }),

    getStops: build.query<StopResponse[], string[]>({
      query: (ids) => {
        const queryString = ids.map((id) => `id=${id}`).join('&');
        return { url: `/stops?${queryString}`, method: 'GET' };
      },
    }),
  }),
});

export const { useGetRoutesQuery, useGetStopsQuery } = routeApi;
