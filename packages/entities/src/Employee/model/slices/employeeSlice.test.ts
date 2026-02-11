/* eslint-disable @typescript-eslint/no-explicit-any */
import { employeeReducer, employeeActions } from './employeeSlice';
import { Employee, EmployeeSchema } from '../types/employee';

describe('employeeSlice', () => {
  const mockEmployee: Employee = {
    id: '1',
    name: 'Roman',
    role: 'admin',
    companyName: 'CityDrive',
    companyId: 'cd-123',
    balance: 1000,
    departmentId: 'dept-1',
    notifications: {
      newEmployees: true,
    },
    time: {
      start: '09:00',
      end: '18:00',
    },
    days: [1, 2, 3, 4, 5],
    cars: ['econom' as any],
    city: [1],
  };

  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
  });

  test('should set employee data', () => {
    const state: DeepPartial<EmployeeSchema> = { data: undefined };
    expect(
      employeeReducer(
        state as EmployeeSchema,
        employeeActions.setEmployeeData(mockEmployee),
      ),
    ).toEqual({ data: mockEmployee });
  });

  describe('initAuthData logic', () => {
    test('should set _inited to true even if token is missing', () => {
      const state: DeepPartial<EmployeeSchema> = { _inited: false };

      const result = employeeReducer(
        state as EmployeeSchema,
        employeeActions.initAuthData(),
      );

      expect(result._inited).toBe(true);
    });

    test('should set _inited to true if token exists', () => {
      localStorage.setItem('token', 'fake_token');
      const state: DeepPartial<EmployeeSchema> = { _inited: false };

      const result = employeeReducer(
        state as EmployeeSchema,
        employeeActions.initAuthData(),
      );

      expect(result._inited).toBe(true);
    });

    test('should use initialState correctly', () => {
      const state = employeeReducer(undefined, { type: '@@INIT' });

      expect(state.data).toBeUndefined();
      expect(state._inited).toBe(false);
    });
  });
});
