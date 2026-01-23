import { DepartmentPage } from '@/pages/DepartmentPage';
import { DepartmentsPage } from '@/pages/DepartmentsPage';
import { EmployeeEditPage } from '@/pages/EmployeeEditPage';
import { EmployeePage } from '@/pages/EmployeePage';
import { EmployeesPage } from '@/pages/EmployeesPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { HomePage } from '@/pages/HomePage';
import { InvoicesPage } from '@/pages/InvoicesPage';
import { LoginPage } from '@/pages/LoginPage';
import { NewDepartmentPage } from '@/pages/NewDepartmentPage';
import { NewEmployeePage } from '@/pages/NewEmployeePage';
import { PromocodesPage } from '@/pages/PromocodesPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { TripPage } from '@/pages/TripPage';
import { TripsPage } from '@/pages/TripsPage';
import { PATHS } from '@/shared/lib/router/paths';
import { ComponentType, LazyExoticComponent } from 'react';

export type AppRouteProps = {
  path: string;
  element: ComponentType<object> | LazyExoticComponent<ComponentType<object>>;
  authOnly?: boolean;
  guestOnly?: boolean;
};

export type AppRouteNames = keyof typeof PATHS;

const routeConfig: Record<AppRouteNames, AppRouteProps> = {
  auth: {
    path: PATHS.auth,
    element: LoginPage,
    guestOnly: true,
  },
  home: {
    path: PATHS.home,
    element: HomePage,
    authOnly: true,
  },
  forgotPassword: {
    path: PATHS.forgotPassword,
    element: ForgotPasswordPage,
    guestOnly: true,
  },
  resetPassword: {
    path: PATHS.resetPassword,
    element: ResetPasswordPage,
    guestOnly: true,
  },
  department: {
    path: PATHS.department,
    element: DepartmentPage,
    authOnly: true,
  },
  departments: {
    path: PATHS.departments,
    element: DepartmentsPage,
    authOnly: true,
  },
  employees: {
    path: PATHS.employees,
    element: EmployeesPage,
    authOnly: true,
  },
  employee: {
    path: PATHS.employee,
    element: EmployeePage,
    authOnly: true,
  },
  employeeEdit: {
    path: PATHS.employeeEdit,
    element: EmployeeEditPage,
    authOnly: true,
  },
  employeeNew: {
    path: PATHS.employeeNew,
    element: NewEmployeePage,
    authOnly: true,
  },
  departmentNew: {
    path: PATHS.departmentNew,
    element: NewDepartmentPage,
    authOnly: true,
  },
  departmentEdit: {
    path: PATHS.employeeEdit,
    element: EmployeeEditPage,
    authOnly: true,
  },
  invoices: {
    path: PATHS.invoices,
    element: InvoicesPage,
    authOnly: true,
  },
  promocodes: {
    path: PATHS.promocodes,
    element: PromocodesPage,
    authOnly: true,
  },
  settings: {
    path: PATHS.settings,
    element: SettingsPage,
    authOnly: true,
  },
  trip: {
    path: PATHS.trip,
    element: TripPage,
    authOnly: true,
  },
  trips: {
    path: PATHS.trips,
    element: TripsPage,
    authOnly: true,
  },
};

export { routeConfig };
