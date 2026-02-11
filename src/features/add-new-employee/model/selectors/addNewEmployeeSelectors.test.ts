import { Employee } from '@citydrive/entities/Employee';
import {
  getAddNewEmployeeData,
  StateWithEmployee,
} from './addNewEmployeeSelectors';

describe('addNewEmployeeSelectors', () => {
  test('должен возвращать данные формы из стейта', () => {
    const data: Partial<Employee> = {
      name: 'Иван Иванов',
      role: 'ADMIN',
    };

    const state: DeepPartial<StateWithEmployee> = {
      addNewEmployee: {
        form: data as Employee,
      },
    };

    expect(getAddNewEmployeeData(state as StateWithEmployee)).toEqual(data);
  });

  test('должен работать с пустым стейтом (возвращать дефолтные данные)', () => {
    const state: DeepPartial<StateWithEmployee> = {};

    expect(getAddNewEmployeeData(state as StateWithEmployee)).toEqual({});
  });

  test('должен возвращать дефолтные данные, если addNewEmployee undefined', () => {
    const state: DeepPartial<StateWithEmployee> = {
      addNewEmployee: undefined,
    };

    expect(getAddNewEmployeeData(state as StateWithEmployee)).toEqual({});
  });
});
