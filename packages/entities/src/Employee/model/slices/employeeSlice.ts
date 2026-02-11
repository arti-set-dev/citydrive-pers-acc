import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, EmployeeSchema } from '../types/employee';

const initialState: EmployeeSchema = {
  data: undefined,
  _inited: false,
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    initAuthData: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state._inited = true;
      } else {
        state._inited = true;
      }
    },
    setEmployeeData: (state, action: PayloadAction<Employee>) => {
      state.data = action.payload;
    },
  },
});

export const { actions: employeeActions } = employeeSlice;
export const { reducer: employeeReducer } = employeeSlice;
