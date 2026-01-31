export { EmployeeList } from './ui/EmployeeList/EmployeeList';
export { employeeActions, employeeReducer } from './model/slices/employeeSlice';
export type {
  Employee,
  EmployeeSchema,
  Role,
  Cars,
} from './model/types/employee';
export {
  getEmployeeData,
  getEmployeeInited,
} from './model/selectors/employeeSelectors';
export {
  useGetEmployeeDataQuery,
  useGetEmployeesListQuery,
  useGetStatsQuery,
} from './api/employeeApi';
