/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditEmployeeForm } from './EditEmployeeForm';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from '../api/editEmployeeApi';
import { useGetDepartmentsQuery } from '@citydrive/entities/Department';
import { editEmployeeReducer } from '../model/slices/editEmployeeSlice';

// 1. Мокаем API
jest.mock('../api/editEmployeeApi');
jest.mock('@citydrive/entities/Department');

const mockedGetById = useGetEmployeeByIdQuery as jest.Mock;
const mockedUpdate = useUpdateEmployeeMutation as jest.Mock;
const mockedGetDepartments = useGetDepartmentsQuery as jest.Mock;

// 2. Мокаем навигацию
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// 3. Стабильные моки для кастомных UI
jest.mock('@citydrive/shared/ui/Select/Select', () => ({
  Select: ({ onChange, options, selected, placeholder }: any) => (
    <select
      data-testid="mock-select"
      value={selected?.name || selected || ''}
      onChange={(e) => {
        const val = e.target.value;
        const opt = options.find(
          (o: any) => (o.name || o || String(o.id)) === val,
        );
        onChange(opt || val);
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o: any) => (
        <option key={o.id || o} value={o.name || o || o.id}>
          {o.name || o}
        </option>
      ))}
    </select>
  ),
}));

jest.mock('@citydrive/shared/ui/TimePicker/TimePicker', () => ({
  TimePicker: ({ onChange, value }: any) => (
    <input
      data-testid="mock-time"
      value={JSON.stringify(value)}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('EditEmployeeForm', () => {
  const updateTrigger = jest.fn();
  const mockEmployee = {
    id: '123',
    name: 'Иван Тестовый',
    email: 'test@test.ru',
    phone: '79990001122',
    role: 'Менеджер',
    limit: 5000,
    balance: 100,
    time: { start: '09:00', end: '18:00' },
    city: [1],
    cars: ['comfort'],
    department: 'IT',
  };

  const initialState = {
    employee: { data: { companyId: 'comp_1' } },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetById.mockReturnValue({ data: mockEmployee, isLoading: false });
    mockedUpdate.mockReturnValue([updateTrigger, { isLoading: false }]);
    mockedGetDepartments.mockReturnValue({
      data: [{ id: '1', name: 'IT' }],
      isLoading: false,
    });
    updateTrigger.mockReturnValue({ unwrap: () => Promise.resolve() });
  });

  test('загружает данные и успешно обновляет сотрудника', async () => {
    const user = userEvent.setup();

    render(<EditEmployeeForm id="123" />, {
      initialState,

      asyncReducers: { editEmployee: editEmployeeReducer as any },
    });

    const nameInput = await screen.findByTestId('employee-name-input');
    expect(nameInput).toHaveValue('Иван Тестовый');

    await user.clear(nameInput);
    await user.type(nameInput, 'Новое Имя');

    const submitBtn = screen.getByTestId('employee-submit-btn');

    await waitFor(() => expect(submitBtn).not.toBeDisabled());
    await user.click(submitBtn);

    await waitFor(() => {
      expect(updateTrigger).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '123',
          name: 'Новое Имя',
          limit: 5000,
        }),
      );
    });

    expect(mockNavigate).toHaveBeenCalled();
  });

  test('показывает скелетоны при загрузке', () => {
    mockedGetById.mockReturnValue({ isLoading: true });

    const { container } = render(<EditEmployeeForm id="123" />, {
      initialState,
    });

    const skeletons = container.querySelectorAll('[class*="Skeleton"]');

    expect(skeletons.length).toBe(10);
  });

  test('блокирует кнопку при сохранении (isUpdating)', async () => {
    mockedUpdate.mockReturnValue([updateTrigger, { isLoading: true }]);
    render(<EditEmployeeForm id="123" />, { initialState });

    await screen.findByTestId('employee-name-input');
    const submitBtn = screen.getByTestId('employee-submit-btn');

    expect(submitBtn).toBeDisabled();
    expect(screen.getByText('Сохранение...')).toBeInTheDocument();
  });
});
