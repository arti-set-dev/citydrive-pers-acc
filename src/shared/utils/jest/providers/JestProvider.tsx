import React, { ReactElement, ReactNode } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, ReducersMapObject, Reducer } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import { employeeReducer } from '@/entities/Employee';
import { loginReducer } from '@/features/login';
import { StateSchema } from '@/app/store/types/types';
import { createReducerManager } from '@/app/store/reducerManager';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: Partial<ReducersMapObject<StateSchema>>;
}

export const render = (
  ui: ReactElement,
  {
    route = '/',
    initialState = {},
    asyncReducers,
    ...options
  }: ExtendedRenderOptions = {},
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    [baseApi.reducerPath]: baseApi.reducer,
    employee: employeeReducer,
    login: loginReducer,
    ...asyncReducers,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer,
    preloadedState: initialState as StateSchema,
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.reducerManager = reducerManager;

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </Provider>
  );

  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...options }),
  };
};

export * from '@testing-library/react';
