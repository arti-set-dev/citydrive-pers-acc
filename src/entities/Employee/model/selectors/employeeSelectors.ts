import { EmployeeSchema } from '../types/employee';

interface StateWithEmployee {
  employee?: EmployeeSchema;
}

export const getEmployeeData = (state: StateWithEmployee) =>
  state.employee?.data;
export const getEmployeeInited = (state: StateWithEmployee) =>
  state.employee?._inited;
