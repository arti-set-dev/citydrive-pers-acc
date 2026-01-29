import { EmployeeSchema } from '@/entities/Employee';
import { AddNewEmployeeSchema } from '@/features/add-new-employee';
import { EditEmployeeSchema } from '@/features/edit-employee';
import { LoginSchema } from '@/features/login';
import { baseApi } from '@/shared/api/baseApi';

export interface StateSchema {
  // Статические редюсеры
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
  employee: EmployeeSchema;
  login: LoginSchema;
  // Асинхронные редюсеры
  addNewEmployee?: AddNewEmployeeSchema;
  editEmployee?: EditEmployeeSchema;
}
