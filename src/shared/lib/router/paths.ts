export const PATHS = {
  home: '/',
  auth: '/auth',
  employees: '/employees',
  employeeNew: '/employees/new',
  departments: '/departments',
  department: '/department/',
  invoices: '/invoices',
  promocodes: '/promocodes',
  trip: '/trip',
  trips: '/trips',
  settings: '/settings',
} as const;

export const getRouteHome = (): string => PATHS.home;
export const getRouteAuth = (): string => PATHS.auth;
export const getRouteEmployees = (): string => PATHS.employees;
export const getRouteEmployeeNew = (): string => PATHS.employeeNew;
export const getRouteDepartments = (): string => PATHS.departments;
export const getRouteDepartment = (): string => PATHS.departments;
export const getRouteTrip = (id: string): string => PATHS.trip + id;
export const getRouteTrips = (): string => PATHS.trips;
export const getRouteInvoices = (): string => PATHS.invoices;
export const getRoutePromocodes = (): string => PATHS.promocodes;
export const getRouteSettings = (): string => PATHS.settings;
