import {
  getEmployeeData,
  getEmployeeInited,
  StateWithEmployee,
} from './employeeSelectors';

describe('employeeSelectors', () => {
  describe('getEmployeeData', () => {
    test('should return employee data', () => {
      const data = {
        id: '1',
        name: 'Roman',
        role: 'admin',
      };
      const state: DeepPartial<StateWithEmployee> = {
        employee: { data },
      };
      expect(getEmployeeData(state as StateWithEmployee)).toEqual(data);
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateWithEmployee> = {};
      expect(getEmployeeData(state as StateWithEmployee)).toBeUndefined();
    });
  });

  describe('getEmployeeInited', () => {
    test('should return _inited true', () => {
      const state: DeepPartial<StateWithEmployee> = {
        employee: { _inited: true },
      };
      expect(getEmployeeInited(state as StateWithEmployee)).toBe(true);
    });

    test('should return _inited false', () => {
      const state: DeepPartial<StateWithEmployee> = {
        employee: { _inited: false },
      };
      expect(getEmployeeInited(state as StateWithEmployee)).toBe(false);
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateWithEmployee> = {};
      expect(getEmployeeInited(state as StateWithEmployee)).toBeUndefined();
    });
  });
});
