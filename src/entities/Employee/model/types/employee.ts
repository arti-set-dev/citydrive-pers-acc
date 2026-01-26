export interface Employee {
  id: string;
  name: string;
  companyName: string;
  companyId: string;
  role: 'admin' | 'user';
  department: string;
  balance: number;
  limit: number;
  spent: number;
  status: 'active' | 'inactive';
  phone: string;
  email: string;
  experimentalFeatures: boolean;
  notifications: {
    newEmployees: boolean;
  };
  departmentId: string;
  time: {
    start: string;
    end: string;
  };
  days: [1, 2, 3, 4, 5, 6, 7];
  cars: 'comfort' | 'economy' | 'premium';
  city: [1, 2, 15, 23];
}

export interface EmployeeSchema {
  data?: Employee;
  _inited: boolean;
}
