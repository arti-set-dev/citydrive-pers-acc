import { DepartmentEditPage } from '@/pages/DepartmentEditPage';
import { DepartmentPage } from '@/pages/DepartmentPage';
import { DepartmentsPage } from '@/pages/DepartmentsPage';
import { EmployeePage } from '@/pages/EmployeePage';
import { EmployeesPage } from '@/pages/EmployeesPage';
import { HomePage } from '@/pages/HomePage';
import { InvoicesPage } from '@/pages/InvoicesPage';
import { LoginPage } from '@/pages/LoginPage';
import { NewDepartmentPage } from '@/pages/NewDepartmentPage';
import { NewEmployeePage } from '@/pages/NewEmployeePage';
import { PromocodesPage } from '@/pages/PromocodesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { TripPage } from '@/pages/TripPage';
import { TripsPage } from '@/pages/TripsPage';
import { PATHS } from '@/shared/lib/router/paths';
import { ComponentType, LazyExoticComponent } from 'react';

type RoutePath =
  | '/'
  | 'auth'
  | 'employees'
  | 'employee'
  | 'employeeNew'
  | 'departments'
  | 'departmentNew'
  | 'departmentId'
  | 'departmentEdit'
  | 'trips'
  | 'trip'
  | 'invoices'
  | 'promocodes'
  | 'settings';

type PageComponent =
  | ComponentType<object>
  | LazyExoticComponent<ComponentType<object>>;

const routeConfig: Record<RoutePath, PageComponent> = {
  '/': HomePage,
  auth: LoginPage,
  departmentId: DepartmentPage,
  departments: DepartmentsPage,
  employees: EmployeesPage,
  employee: EmployeePage,
  employeeNew: NewEmployeePage,
  departmentNew: NewDepartmentPage,
  departmentEdit: DepartmentEditPage,
  invoices: InvoicesPage,
  promocodes: PromocodesPage,
  settings: SettingsPage,
  trip: TripPage,
  trips: TripsPage,
};

const routePathMap: Record<RoutePath, string> = {
  '/': PATHS.home,
  auth: PATHS.auth,
  employees: PATHS.employees,
  employee: PATHS.employee,
  employeeNew: PATHS.employeeNew,
  departments: PATHS.departments,
  departmentId: PATHS.department,
  departmentEdit: PATHS.departmentEdit,
  departmentNew: PATHS.departmentNew,
  invoices: PATHS.invoices,
  promocodes: PATHS.promocodes,
  trip: PATHS.trip,
  trips: PATHS.trips,
  settings: PATHS.settings,
};

export { routeConfig, routePathMap };
export type { RoutePath };
