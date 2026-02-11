/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddNewEmployeeForm } from './AddNewEmployeeForm';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';
import { useCreateEmployeeMutation } from '../api/addNewEmployeeApi';
import { useGetDepartmentsQuery } from '@citydrive/entities/Department';
import { useCreateNotificationMutation } from '@citydrive/entities/Notification';
import { Employee } from '@citydrive/entities/Employee';
import { addNewEmployeeReducer } from '../model/slices/addNewEmployeeSlice';
import { Reducer } from '@reduxjs/toolkit';

jest.mock('../api/addNewEmployeeApi');
jest.mock('@citydrive/entities/Department');
jest.mock('@citydrive/entities/Notification');

const mockedCreateEmployee = useCreateEmployeeMutation as jest.Mock;
const mockedGetDepartments = useGetDepartmentsQuery as jest.Mock;
const mockedCreateNotification = useCreateNotificationMutation as jest.Mock;

jest.mock('@citydrive/shared/ui/Select/Select', () => ({
  Select: ({ onChange, options, selected, placeholder }: any) => (
    <select
      data-testid="mock-select"
      value={selected?.id || selected || ''}
      onChange={(e) => {
        const val = e.target.value;

        const opt = options.find((o: any) => String(o.id || o) === val);
        onChange(opt || val);
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o: any) => (
        <option key={o.id || o} value={o.id || o.name || o}>
          {o.name || o}
        </option>
      ))}
    </select>
  ),
}));

describe('AddNewEmployeeForm', () => {
  const createEmployeeTrigger = jest.fn();
  const createNotificationTrigger = jest.fn();

  const validFormData: Partial<Employee> = {
    name: 'Иван Иванов',
    email: 'ivan@test.com',
    phone: '79991234567',
    role: 'Менеджер',
    limit: 1000,
    balance: 0,
    time: {
      start: '09:00',
      end: '18:00',
    },
    city: [1],
    cars: ['comfort'],
    days: [1, 2, 3],
    department: 'IT',
  };

  const initialState = {
    employee: {
      data: {
        companyId: 'comp_1',
        companyName: 'CityDrive',
        notifications: { newEmployees: true },
      },
    },
    addNewEmployee: { form: validFormData as Employee },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedCreateEmployee.mockReturnValue([
      createEmployeeTrigger,
      { isLoading: false },
    ]);
    mockedCreateNotification.mockReturnValue([
      createNotificationTrigger,
      { isLoading: false },
    ]);
    mockedGetDepartments.mockReturnValue({
      data: [{ id: 'dep_1', name: 'IT' }],
      isLoading: false,
    });
    createEmployeeTrigger.mockReturnValue({
      unwrap: () => Promise.resolve({ id: '99', name: 'Ivan' }),
    });
    createNotificationTrigger.mockReturnValue({
      unwrap: () => Promise.resolve(),
    });
  });

  test('успешное создание сотрудника', async () => {
    const user = userEvent.setup();

    render(<AddNewEmployeeForm />, {
      initialState,
      asyncReducers: {
        addNewEmployee: addNewEmployeeReducer as Reducer,
      },
    });

    const submitBtn = screen.getByRole('button', {
      name: /создать сотрудника/i,
    });

    await waitFor(() => expect(submitBtn).not.toBeDisabled());

    await user.click(submitBtn);

    await waitFor(() => {
      expect(createEmployeeTrigger).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Иван Иванов',
          companyId: 'comp_1',
        }),
      );
    });
  });

  test('сохранение в стор при unmount', async () => {
    const { store, unmount } = render(<AddNewEmployeeForm />, { initialState });

    const nameInput = screen.getByPlaceholderText('Имя и фамилия');
    fireEvent.change(nameInput, { target: { value: 'New Name' } });

    unmount();

    const state = store.getState() as any;
    expect(state.addNewEmployee.form.name).toBe('New Name');
  });

  test('отображение лоадера', () => {
    mockedCreateEmployee.mockReturnValue([
      createEmployeeTrigger,
      { isLoading: true },
    ]);
    render(<AddNewEmployeeForm />, { initialState });
    expect(screen.getByText('Создание...')).toBeInTheDocument();
  });
});
