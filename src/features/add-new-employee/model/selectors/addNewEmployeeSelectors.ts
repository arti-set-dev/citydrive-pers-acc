import { Employee } from '@/entities/Employee';
import { AddNewEmployeeSchema } from '../types/addNewEmployee';
import { createSelector } from '@reduxjs/toolkit';

interface StateWithEmployee {
  addNewEmployee?: AddNewEmployeeSchema;
}

const DEFAULT_FORM_DATA = {} as Employee;

const getAddNewEmployeeState = (state: StateWithEmployee) =>
  state.addNewEmployee;

export const getAddNewEmployeeData = createSelector(
  [getAddNewEmployeeState],
  (addNewEmployeeState) => addNewEmployeeState?.form ?? DEFAULT_FORM_DATA,
);
