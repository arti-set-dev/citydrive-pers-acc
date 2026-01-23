import { LoginSchema } from '../types/login';

interface StateWithLogin {
  login?: LoginSchema;
}

export const getLoginName = (state: StateWithLogin) =>
  state.login?.data.name ?? '';
export const getLoginEmail = (state: StateWithLogin) =>
  state.login?.data.email ?? '';
export const getLoginPassword = (state: StateWithLogin) =>
  state.login?.data.password ?? '';
export const getIsAuth = (state: StateWithLogin) =>
  state.login?.data.isAuth || false;
