import { Employee } from '@/entities/Employee';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddNewEmployeeSchema } from '../types/addNewEmployee';

export const initialState: AddNewEmployeeSchema = {
  form: {
    id: '',
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active',
    department: '',
    departmentId: '',
    limit: 0,
    spent: 0,
    companyName: '',
    companyId: '',
    balance: 0,
    experimentalFeatures: false,
    notifications: {
      newEmployees: true,
    },
    time: {
      start: '09:00',
      end: '18:00',
    },
    days: [],
    cars: ['comfort'],
    city: [],
    lastTimeTrip: '',
  },
};

export const addNewEmployeeSlice = createSlice({
  name: 'addNewEmployee',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Employee>) => {
      state.form = { ...state.form, ...action.payload };
    },
    clearForm: (state) => {
      state.form = { ...initialState.form } as Employee;
    },
  },
});

export const { actions: addNewEmployeeActions } = addNewEmployeeSlice;
export const { reducer: addNewEmployeeReducer } = addNewEmployeeSlice;
