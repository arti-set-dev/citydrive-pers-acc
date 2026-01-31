export type Role = 'admin' | 'user';
export type Status = 'active' | 'inactive';
export type Cars = 'comfort' | 'economy' | 'premium';

export interface Employee {
  id: string;
  name: string;
  lastTimeTrip?: string;
  phone?: string;
  role?: string;
  department?: string;
  limit?: number;
  spent?: number;
  email?: string;
  status?: Status;

  companyName: string;
  companyId: string;
  balance: number;
  experimentalFeatures: boolean;
  notifications: {
    newEmployees: boolean;
  };
  departmentId: string;
  time: {
    start: string;
    end: string;
  };
  days: number[];
  cars: [Cars];
  city: number[];
}

export interface EmployeeStats {
  id?: string;
  employeeId: string;
  date: string;
  trips: number;
  spent: number;
  remaining: number;
}

export interface EmployeeSchema {
  data?: Employee;
  _inited: boolean;
}
