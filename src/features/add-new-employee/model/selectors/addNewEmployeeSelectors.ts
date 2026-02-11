import { Employee } from '@citydrive/entities/Employee';
import { AddNewEmployeeSchema } from '../types/addNewEmployee';
import { createSelector } from '@reduxjs/toolkit';

export interface StateWithEmployee {
  addNewEmployee?: AddNewEmployeeSchema;
}

const DEFAULT_FORM_DATA = {} as Employee;

const getAddNewEmployeeState = (state: StateWithEmployee) =>
  state.addNewEmployee;

export const getAddNewEmployeeData = createSelector(
  [getAddNewEmployeeState],
  (addNewEmployeeState) => addNewEmployeeState?.form ?? DEFAULT_FORM_DATA,
);
