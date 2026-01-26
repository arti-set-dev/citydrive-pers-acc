export interface Department {
  id: string;
  name: string;
  limit: number;
  spent: number;
  employeesIds: string[];
  companyId: string;
}
