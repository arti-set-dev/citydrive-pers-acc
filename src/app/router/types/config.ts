import { DepartmentPage } from '@/pages/DepartmentPage';
import { DepartmentsPage } from '@/pages/DepartmentsPage';
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
  | 'employeeNew'
  | 'departments'
  | 'departmentNew'
  | 'department'
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
  department: DepartmentPage,
  departments: DepartmentsPage,
  employees: EmployeesPage,
  employeeNew: NewEmployeePage,
  departmentNew: NewDepartmentPage,
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
  employeeNew: PATHS.employeeNew,
  departments: PATHS.departments,
  department: PATHS.department,
  departmentNew: PATHS.departmentNew,
  invoices: PATHS.invoices,
  promocodes: PATHS.promocodes,
  trip: PATHS.trip,
  trips: PATHS.trips,
  settings: PATHS.settings,
};

export { routeConfig, routePathMap };
export type { RoutePath };
