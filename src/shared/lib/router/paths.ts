export const PATHS = {
  home: '/',
  auth: '/auth',
  employees: '/employees',
  employee: '/employees/:id',
  employeeNew: '/employees/new',
  departments: '/departments',
  department: '/departments/:id',
  departmentNew: '/department/new',
  departmentEdit: '/departments/:id/edit',
  invoices: '/invoices',
  promocodes: '/promocodes',
  trip: '/trips/:id',
  trips: '/trips',
  settings: '/settings',
} as const;

export const getRouteHome = (): string => PATHS.home;
export const getRouteAuth = (): string => PATHS.auth;
export const getRouteEmployees = (): string => PATHS.employees;
export const getRouteEmployee = (id: string): string => PATHS.employee + id;
export const getRouteEmployeeNew = (): string => PATHS.employeeNew;
export const getRouteDepartments = (): string => PATHS.departments;
export const getRouteDepartment = (id: string): string =>
  PATHS.departments + id;
export const getRouteDepartmentNew = (): string => PATHS.departmentNew;
export const getRouteDepartmentEdit = (id: string): string =>
  `/departments/${id}/edit`;
export const getRouteTrip = (id: string): string => PATHS.trip + id;
export const getRouteTrips = (): string => PATHS.trips;
export const getRouteInvoices = (): string => PATHS.invoices;
export const getRoutePromocodes = (): string => PATHS.promocodes;
export const getRouteSettings = (): string => PATHS.settings;
