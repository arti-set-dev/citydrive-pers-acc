/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmployeesFilter } from './EmployeesFilter';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';
import { useGetEmployeesListQuery } from '@citydrive/entities/Employee';

jest.mock('@citydrive/entities/Employee', () => ({
  ...jest.requireActual('@citydrive/entities/Employee'),
  useGetEmployeesListQuery: jest.fn(),
  EmployeeList: ({ filters }: any) => (
    <div data-testid="employee-list-mock">{JSON.stringify(filters)}</div>
  ),
}));

const mockedGetEmployees = useGetEmployeesListQuery as jest.Mock;

jest.mock('@citydrive/shared/ui/Select/Select', () => ({
  Select: ({ onChange, options, selected }: any) => (
    <select
      data-testid="filter-select"
      value={selected?.id || 'all'}
      onChange={(e) => {
        const opt = options.find((o: any) => o.id === e.target.value);
        onChange(opt);
      }}
    >
      {options.map((o: any) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  ),
}));

describe('EmployeesFilter', () => {
  const mockEmployees = [
    { id: '1', name: 'Ivan', role: 'admin', department: 'IT' },
    { id: '2', name: 'Petr', role: 'user', department: 'HR' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockedGetEmployees.mockReturnValue({
      data: mockEmployees,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('динамически формирует опции ролей и отделов из API', () => {
    render(<EmployeesFilter />);

    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('IT')).toBeInTheDocument();
  });

  test('работа дебаунса при поиске по имени', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<EmployeesFilter />);

    const searchInput = screen.getByPlaceholderText(/имя или телефон/i);
    await user.type(searchInput, 'Roman');

    expect(screen.getByTestId('employee-list-mock')).not.toHaveTextContent(
      'Roman',
    );

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(screen.getByTestId('employee-list-mock')).toHaveTextContent('Roman');
  });

  test('кнопка сброса становится активной только при изменении фильтров', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<EmployeesFilter />);

    const resetBtn = screen.getByRole('button', { name: /сбросить/i });
    expect(resetBtn).toBeDisabled();

    const searchInput = screen.getByPlaceholderText(/имя или телефон/i);
    await user.type(searchInput, 'A');

    expect(resetBtn).not.toBeDisabled();

    await user.click(resetBtn);
    expect(searchInput).toHaveValue('');
    expect(resetBtn).toBeDisabled();
  });

  test('обновление фильтров через селекторы', async () => {
    render(<EmployeesFilter />);

    const statusSelect = screen.getAllByTestId('filter-select')[0];

    fireEvent.change(statusSelect, { target: { value: 'active' } });

    expect(screen.getByTestId('employee-list-mock')).toHaveTextContent(
      '"status":"active"',
    );
  });
});
