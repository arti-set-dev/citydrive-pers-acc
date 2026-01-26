export const PATHS = {
  home: '/',
  auth: '/auth',
  registration: '/auth/registration',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  employees: '/employees',
  employee: '/employees/:id',
  employeeNew: '/employees/new',
  employeeEdit: '/employees/:id/edit',
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
export const getRouteRegistration = (): string => PATHS.registration;
export const getRouteForgotAuthPassword = (): string => PATHS.forgotPassword;
export const getRouteResetAuthPassword = (): string => PATHS.resetPassword;
export const getRouteEmployees = (): string => PATHS.employees;
export const getRouteEmployee = (id: string): string => PATHS.employee + id;
export const getRouteEmployeeEdit = (id: string): string =>
  `/employees/${id}/edit`;
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
