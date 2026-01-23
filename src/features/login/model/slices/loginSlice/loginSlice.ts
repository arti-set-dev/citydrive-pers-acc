import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../../types/login';

const initialState: LoginSchema = {
  data: {
    email: '',
    name: '',
    password: '',
    isAuth: Boolean(localStorage.getItem('token')) || false,
  },
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginName: (state, action: PayloadAction<string>) => {
      state.data.name = action.payload;
    },
    setLoginEmail: (state, action: PayloadAction<string>) => {
      state.data.email = action.payload;
    },
    setLoginPassword: (state, action: PayloadAction<string>) => {
      state.data.password = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.data.isAuth = action.payload;
    },
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
