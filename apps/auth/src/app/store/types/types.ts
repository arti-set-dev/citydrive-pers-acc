import { EmployeeSchema } from '@citydrive/entities/Employee';
import { LoginSchema } from '@citydrive/auth';
import { baseApi } from '@citydrive/shared/api/baseApi';

export interface StateSchema {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
  employee: EmployeeSchema;
  login: LoginSchema;
}
