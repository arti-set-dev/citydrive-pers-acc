import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddNewDepartmentForm } from './AddNewDepartmentForm';
import { useCreateDepartmentMutation } from '../../api/addNewDepartmentApi';
import { render } from '@/shared/utils/jest/providers/JestProvider';

jest.mock('../../api/addNewDepartmentApi');
const mockedCreateDepartment = useCreateDepartmentMutation as jest.Mock;

describe('AddNewDepartmentForm', () => {
  const createTrigger = jest.fn();
  const initialState = {
    employee: {
      data: { companyId: 'comp_777', id: 'emp_1' },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedCreateDepartment.mockReturnValue([
      createTrigger,
      { isLoading: false },
    ]);
    createTrigger.mockReturnValue({ unwrap: () => Promise.resolve() });
  });

  test('успешная отправка и очистка формы', async () => {
    const user = userEvent.setup();
    render(<AddNewDepartmentForm />, { initialState });

    const nameInput = screen.getByTestId('department-name-input');
    const limitInput = screen.getByTestId('department-limit-input');
    const submitBtn = screen.getByTestId('department-submit-btn');

    await user.type(nameInput, 'Отдел маркетинга');
    await user.type(limitInput, '500000');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(createTrigger).toHaveBeenCalledWith({
        name: 'Отдел маркетинга',
        limit: 500000,
        companyId: 'comp_777',
        spent: 0,
        employeesIds: [],
      });
    });

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(limitInput).toHaveValue(null);
    });
  });

  test('валидация показывает ошибки', async () => {
    const user = userEvent.setup();
    render(<AddNewDepartmentForm />, { initialState });

    const submitBtn = screen.getByTestId('department-submit-btn');
    await user.click(submitBtn);

    expect(await screen.findByText('Введите название')).toBeInTheDocument();
    expect(await screen.findByText('Укажите лимит')).toBeInTheDocument();
  });

  test('блокировка кнопки при загрузке', () => {
    mockedCreateDepartment.mockReturnValue([
      createTrigger,
      { isLoading: true },
    ]);
    render(<AddNewDepartmentForm />, { initialState });

    expect(screen.getByTestId('department-submit-btn')).toBeDisabled();
  });
});
