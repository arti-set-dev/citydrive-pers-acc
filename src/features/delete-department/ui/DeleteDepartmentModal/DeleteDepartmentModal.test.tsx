import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteDepartmentModal } from './DeleteDepartmentModal';
import { render } from '@/shared/utils/jest/providers/JestProvider';
import { useDeleteDepartmentMutation } from '../../api/deleteDepartmentApi';
import { Department } from '@/entities/Department';

jest.mock('../../api/deleteDepartmentApi');
const mockedDeleteDepartment = useDeleteDepartmentMutation as jest.Mock;

describe('DeleteDepartmentModal', () => {
  const deleteTrigger = jest.fn();
  const onClose = jest.fn();

  const mockDept: Department = {
    id: 'dept_123',
    name: 'Отдел разработки',
    limit: 100,
    spent: 0,
    employeesIds: [],
    companyId: 'comp_1',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedDeleteDepartment.mockReturnValue([
      deleteTrigger,
      { isLoading: false },
    ]);
    deleteTrigger.mockReturnValue({ unwrap: () => Promise.resolve() });
  });

  test('отображает название отдела в тексте', () => {
    render(
      <DeleteDepartmentModal
        department={mockDept}
        isOpen={true}
        onClose={onClose}
      />,
    );

    expect(screen.getByText(/удалить отдел/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockDept.name, 'i')),
    ).toBeInTheDocument();
  });

  test('вызывает deleteDepartment и onClose при подтверждении', async () => {
    const user = userEvent.setup();
    render(
      <DeleteDepartmentModal
        department={mockDept}
        isOpen={true}
        onClose={onClose}
      />,
    );

    const deleteBtn = screen.getByRole('button', { name: /удалить/i });
    await user.click(deleteBtn);

    expect(deleteTrigger).toHaveBeenCalledWith(mockDept.id);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('вызывает onClose при клике на "Отмена"', async () => {
    const user = userEvent.setup();
    render(
      <DeleteDepartmentModal
        department={mockDept}
        isOpen={true}
        onClose={onClose}
      />,
    );

    const cancelBtn = screen.getByRole('button', { name: /отмена/i });
    await user.click(cancelBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(deleteTrigger).not.toHaveBeenCalled();
  });

  test('блокирует кнопку и меняет текст при загрузке', () => {
    mockedDeleteDepartment.mockReturnValue([
      deleteTrigger,
      { isLoading: true },
    ]);
    render(
      <DeleteDepartmentModal
        department={mockDept}
        isOpen={true}
        onClose={onClose}
      />,
    );

    const deleteBtn = screen.getByText('Удаление...');
    expect(deleteBtn.closest('button')).toBeDisabled();
  });

  test('ничего не рендерит, если department === null', () => {
    const { container } = render(
      <DeleteDepartmentModal
        department={null}
        isOpen={true}
        onClose={onClose}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
