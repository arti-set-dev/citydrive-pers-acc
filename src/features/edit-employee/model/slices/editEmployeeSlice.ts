import { Employee } from '@/entities/Employee';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditEmployeeSchema } from '../types/editEmployee';

const initialState: Partial<EditEmployeeSchema> = {
  form: undefined,
};

export const editEmployeeSlice = createSlice({
  name: 'editEmployee',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Employee>) => {
      state.form = { ...state.form, ...action.payload };
    },
    clearForm: (state) => {
      state.form = undefined;
    },
  },
});

export const { actions: editEmployeeActions } = editEmployeeSlice;
export const { reducer: editEmployeeReducer } = editEmployeeSlice;
