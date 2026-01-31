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

export const routeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRoutes: build.query<
      RoutePathResponse[],
      {
        employeeId: string;
        date?: string;
        sort?: 'price' | '-price';
        startDate?: string;
        endDate?: string;
      }
    >({
      query: ({ employeeId, date, sort, startDate, endDate }) => ({
        url: '/routPaths',
        method: 'GET',
        params: {
          employeeId,
          date,
          date_gte: startDate,
          date_lte: endDate,
          _sort: sort ? 'price' : undefined,
          _order: sort === '-price' ? 'desc' : 'asc',
        },
      }),
    }),

    getStops: build.query<StopResponse[], string[]>({
      query: (ids) => {
        const queryString = ids.map((id) => `id=${id}`).join('&');
        return {
          url: `/stops?${queryString}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetRoutesQuery, useGetStopsQuery } = routeApi;
