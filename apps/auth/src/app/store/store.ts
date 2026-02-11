import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { baseApi } from '@citydrive/shared/api/baseApi';
import { employeeReducer } from '@citydrive/entities/Employee';
import { loginReducer } from '@citydrive/auth';
import { StateSchema } from './types/types';

const rootReducers: ReducersMapObject<StateSchema> = {
  [baseApi.reducerPath]: baseApi.reducer,
  employee: employeeReducer,
  login: loginReducer,
};

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

export type RootState = StateSchema;
export type AppDispatch = typeof store.dispatch;
