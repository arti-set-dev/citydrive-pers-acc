import { Employee } from '@/entities/Employee';
import {
  addNewEmployeeReducer,
  addNewEmployeeActions,
  initialState,
} from './addNewEmployeeSlice';

describe('addNewEmployeeSlice', () => {
  test('должен обновлять данные формы (updateFormData)', () => {
    const state = { ...initialState };
    const partialEmployee = {
      name: 'Roman',
      email: 'test@test.ru',
    } as Employee;

    const result = addNewEmployeeReducer(
      state,
      addNewEmployeeActions.updateFormData(partialEmployee),
    );

    expect(result?.form?.name).toBe('Roman');
    expect(result?.form?.email).toBe('test@test.ru');
    expect(result?.form?.role).toBe('user');
  });

  test('должен очищать форму до начального состояния (clearForm)', () => {
    const modifiedState = {
      form: {
        ...initialState.form,
        name: 'To Be Cleared',
        limit: 1000,
      } as Employee,
    };

    const result = addNewEmployeeReducer(
      modifiedState,
      addNewEmployeeActions.clearForm(),
    );

    expect(result).toEqual(initialState);
  });

  test('должен возвращать initialState при передаче пустого экшена', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(addNewEmployeeReducer(undefined, { type: '' })).toEqual(
      initialState,
    );
  });
});
