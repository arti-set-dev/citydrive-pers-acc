import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from './reducerManager';
import { baseApi } from '@/shared/api/baseApi';
import { StateSchema } from './types/types';
import { employeeReducer } from '@/entities/Employee';
import { loginReducer } from '@/features/login';

const staticReducers: ReducersMapObject<StateSchema> = {
  [baseApi.reducerPath]: baseApi.reducer,
  employee: employeeReducer,
  login: loginReducer,
};

const reducerManager = createReducerManager(staticReducers);

export const store = configureStore({
  reducer: reducerManager.reduce as Reducer,
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
store.reducerManager = reducerManager;

export type RootState = StateSchema;
export type AppDispatch = typeof store.dispatch;
