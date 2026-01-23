import {
  combineReducers,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from '@reduxjs/toolkit';
import { StateSchema } from './types/types';

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
  add: (key: keyof StateSchema, reducer: Reducer) => void;
  remove: (key: keyof StateSchema) => void;
}

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  const reducers: ReducersMapObject<StateSchema> = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);
  let keysToRemove: Array<keyof StateSchema> = [];

  return {
    getReducerMap: () => reducers,

    reduce: (state: StateSchema, action: UnknownAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return combinedReducer(state, action);
    },

    add: (key: keyof StateSchema, reducer: Reducer) => {
      if (!key || reducers[key]) return;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },

    remove: (key: keyof StateSchema) => {
      if (!key || !reducers[key]) return;

      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
