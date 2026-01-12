import { DepartmentPage } from '@/pages/DepartmentPage';
import { DepartmentsPage } from '@/pages/DepartmentsPage';
import { EmployeesPage } from '@/pages/EmployeesPage';
import { HomePage } from '@/pages/HomePage';
import { InvoicesPage } from '@/pages/InvoicesPage';
import { LoginPage } from '@/pages/LoginPage';
import { PromocodesPage } from '@/pages/PromocodesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { TripPage } from '@/pages/TripPage';
import { TripsPage } from '@/pages/TripsPage';
import { ComponentType, LazyExoticComponent } from 'react';

type RoutePath =
  | '/'
  | 'auth'
  | 'employees'
  | 'departments'
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
  invoices: InvoicesPage,
  promocodes: PromocodesPage,
  settings: SettingsPage,
  trip: TripPage,
  trips: TripsPage,
};

export default routeConfig;
