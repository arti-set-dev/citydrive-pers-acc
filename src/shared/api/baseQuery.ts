import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { $api } from './interceptors';

export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  }> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await $api({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
