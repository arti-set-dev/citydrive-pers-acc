import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditDepartmentForm } from './EditDepartmentForm';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';
import { useUpdateDepartmentMutation } from '../api/editDepartmentApi';
import { useGetDepartmentByIdQuery } from '@citydrive/entities/Department';

// Мокаем хуки
jest.mock('../api/editDepartmentApi');
jest.mock('@citydrive/entities/Department');

const mockedUpdate = useUpdateDepartmentMutation as jest.Mock;
const mockedGetById = useGetDepartmentByIdQuery as jest.Mock;

// Мокаем роутинг
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'dept_123' }),
  useNavigate: () => mockNavigate,
}));

describe('EditDepartmentForm', () => {
  const updateTrigger = jest.fn();
  const mockDept = { id: 'dept_123', name: 'HR', limit: 5000 };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUpdate.mockReturnValue([updateTrigger, { isLoading: false }]);
    mockedGetById.mockReturnValue({ data: mockDept, isLoading: false });
    updateTrigger.mockReturnValue({ unwrap: () => Promise.resolve() });
  });

  test('заполняет форму данными при загрузке', async () => {
    render(<EditDepartmentForm />);

    expect(screen.getByTestId('dept-name-input')).toHaveValue('HR');
    expect(screen.getByTestId('dept-limit-input')).toHaveValue(5000);
  });

  test('успешное редактирование и редирект', async () => {
    const user = userEvent.setup();
    render(<EditDepartmentForm />);

    const nameInput = screen.getByTestId('dept-name-input');
    const submitBtn = screen.getByTestId('dept-submit-btn');

    await user.clear(nameInput);
    await user.type(nameInput, 'New Department Name');
    await user.click(submitBtn);

    expect(updateTrigger).toHaveBeenCalledWith({
      id: 'dept_123',
      name: 'New Department Name',
      limit: 5000,
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  test('показывает лоадер при получении данных', () => {
    mockedGetById.mockReturnValue({ isLoading: true });

    const { container } = render(<EditDepartmentForm />);

    const loader = container.querySelector('[class*="loader"]');

    expect(loader).toBeInTheDocument();
  });

  test('блокирует кнопку при сохранении', () => {
    mockedUpdate.mockReturnValue([updateTrigger, { isLoading: true }]);
    render(<EditDepartmentForm />);

    const submitBtn = screen.getByTestId('dept-submit-btn');
    expect(submitBtn).toBeDisabled();
    expect(screen.getByText('Сохранение...')).toBeInTheDocument();
  });
});
