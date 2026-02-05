import { screen, fireEvent } from '@testing-library/react';
import { DatePicker } from './DatePicker';
import { render } from '@/shared/utils/jest/providers/JestProvider';

describe('DatePicker', () => {
  const mockOnChange = jest.fn();
  const dateRange = {
    from: new Date(2024, 0, 1),
    to: new Date(2024, 0, 10),
  };

  test('отображает отформатированные даты в инпутах', () => {
    render(<DatePicker value={dateRange} onChange={mockOnChange} />);

    expect(screen.getByDisplayValue('01.01.2024')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10.01.2024')).toBeInTheDocument();
  });

  test('открывает календарь при клике на поле', () => {
    render(<DatePicker />);

    const input = screen.getByPlaceholderText('За период с');
    fireEvent.click(input);

    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  test('вызывает onChange при выборе даты', async () => {
    render(<DatePicker onChange={mockOnChange} />);

    fireEvent.click(screen.getByPlaceholderText('За период с'));

    const grid = await screen.findByRole('grid');
    expect(grid).toBeInTheDocument();

    const dayButton = screen.getByRole('button', { name: /15/ });

    fireEvent.mouseDown(dayButton);
    fireEvent.click(dayButton);

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('закрывает календарь при клике вне компонента', () => {
    render(<DatePicker />);

    fireEvent.click(screen.getByPlaceholderText('За период с'));
    expect(screen.queryByRole('grid')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  });

  test('отображает ошибку, если она передана', () => {
    const errorMessage = 'Выберите дату';
    render(<DatePicker error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('второе поле задизейблено, если не выбрана дата "от"', () => {
    render(<DatePicker value={{ from: undefined, to: undefined }} />);

    const endDateInput = screen.getByPlaceholderText('По');
    expect(endDateInput).toBeDisabled();
  });
});
