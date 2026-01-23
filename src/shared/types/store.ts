import { EnhancedStore, Reducer } from '@reduxjs/toolkit';

export interface ReducerManager {
  getReducerMap: () => Record<string, Reducer>;
  add: (key: string, reducer: Reducer) => void;
  remove: (key: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ReduxStoreWithManager<T = any> extends EnhancedStore<T> {
  reducerManager: ReducerManager;
}
