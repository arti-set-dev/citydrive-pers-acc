import { configureStore, Reducer } from '@reduxjs/toolkit';
import { createReducerManager } from './reducerManager';
import { baseApi } from '@/shared/api/baseApi';
import { StateSchema } from './types/types';

const staticReducers = {
  [baseApi.reducerPath]: baseApi.reducer,
};

export const reducerManager = createReducerManager(staticReducers);

export const store = configureStore({
  reducer: reducerManager.reduce as Reducer,
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

export type RootState = StateSchema;
export type AppDispatch = typeof store.dispatch;
