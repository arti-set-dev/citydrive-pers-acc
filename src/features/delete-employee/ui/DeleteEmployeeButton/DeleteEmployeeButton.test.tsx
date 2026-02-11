import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteEmployeeButton } from './DeleteEmployeeButton';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';
import { useDeleteEmployeeMutation } from '../../api/deleteEmployeeApi';

jest.mock('../../api/deleteEmployeeApi');
const mockedDeleteEmployee = useDeleteEmployeeMutation as jest.Mock;

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('DeleteEmployeeButton', () => {
  const deleteTrigger = jest.fn();
  const employeeId = 'emp_123';

  beforeEach(() => {
    jest.clearAllMocks();
    mockedDeleteEmployee.mockReturnValue([deleteTrigger, { isLoading: false }]);
    deleteTrigger.mockReturnValue({ unwrap: () => Promise.resolve() });
  });

  test('открывает модалку при клике на кнопку удаления', async () => {
    const user = userEvent.setup();
    render(<DeleteEmployeeButton id={employeeId} />);

    await user.click(screen.getByTestId('delete-employee-open-btn'));

    expect(
      screen.getByText(/Вы точно хотите удалить вашего сотрудника/i),
    ).toBeInTheDocument();
  });

  test('успешное удаление и редирект', async () => {
    const user = userEvent.setup();
    render(<DeleteEmployeeButton id={employeeId} />);

    await user.click(screen.getByTestId('delete-employee-open-btn'));

    const confirmBtn = screen.getByTestId('delete-employee-confirm-btn');
    await user.click(confirmBtn);

    expect(deleteTrigger).toHaveBeenCalledWith(employeeId);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(expect.any(String));
    });
  });

  test('закрытие модалки при нажатии "Отмена"', async () => {
    const user = userEvent.setup();
    render(<DeleteEmployeeButton id={employeeId} />);

    await user.click(screen.getByTestId('delete-employee-open-btn'));
    await user.click(screen.getByTestId('delete-employee-cancel-btn'));

    expect(
      screen.queryByText(/Вы точно хотите удалить вашего сотрудника/i),
    ).not.toBeInTheDocument();
    expect(deleteTrigger).not.toHaveBeenCalled();
  });

  test('состояние загрузки блокирует кнопки', () => {
    mockedDeleteEmployee.mockReturnValue([deleteTrigger, { isLoading: true }]);
    render(<DeleteEmployeeButton id={employeeId} />);

    fireEvent.click(screen.getByTestId('delete-employee-open-btn'));

    expect(screen.getByTestId('delete-employee-confirm-btn')).toBeDisabled();
    expect(screen.getByTestId('delete-employee-cancel-btn')).toBeDisabled();
    expect(screen.getByText('Удаление...')).toBeInTheDocument();
  });
});
