import { Employee } from '@/entities/Employee';
import { editEmployeeReducer, editEmployeeActions } from './editEmployeeSlice';
import { EditEmployeeSchema } from '../types/editEmployee';

describe('editEmployeeSlice', () => {
  const initialState: Partial<EditEmployeeSchema> = {
    form: undefined,
  };

  const mockEmployee = {
    id: '1',
    name: 'Roman',
    role: 'admin',
  } as Employee;

  test('должен устанавливать данные в пустую форму (updateFormData)', () => {
    const result = editEmployeeReducer(
      initialState as EditEmployeeSchema,
      editEmployeeActions.updateFormData(mockEmployee),
    );

    expect(result.form).toEqual(mockEmployee);
  });

  test('должен мерджить новые данные с существующими в форме', () => {
    const existingState: EditEmployeeSchema = {
      form: { ...mockEmployee, name: 'Old Name' } as Employee,
    };

    const update = { name: 'New Name' } as Employee;

    const result = editEmployeeReducer(
      existingState,
      editEmployeeActions.updateFormData(update),
    );

    expect(result.form?.name).toBe('New Name');
    expect(result.form?.role).toBe('admin');
    expect(result.form?.id).toBe('1');
  });

  test('должен очищать форму (clearForm)', () => {
    const dirtyState: EditEmployeeSchema = {
      form: mockEmployee,
    };

    const result = editEmployeeReducer(
      dirtyState,
      editEmployeeActions.clearForm(),
    );

    expect(result.form).toBeUndefined();
  });

  test('должен возвращать дефолтный стейт при инициализации', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(editEmployeeReducer(undefined, { type: '' })).toEqual(initialState);
  });
});
