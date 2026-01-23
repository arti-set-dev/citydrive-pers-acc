import { useEffect } from 'react';
import { useStore, useDispatch } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';

interface Options {
  removeAfterUnmount?: boolean;
}

export const useAsyncReducer = (
  key: string,
  reducer: Reducer,
  options?: Options,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = useStore() as any;
  const dispatch = useDispatch();

  useEffect(() => {
    const mounted = store.reducerManager.getReducerMap()[key];

    if (!mounted) {
      store.reducerManager.add(key, reducer);
      dispatch({ type: `@INIT ${key} reducer` });
    }

    return () => {
      if (options?.removeAfterUnmount) {
        store.reducerManager.remove(key);
        dispatch({ type: `@DESTROY ${key} reducer` });
      }
    };
  }, []);
};
