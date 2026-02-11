import { screen, fireEvent, within } from '@testing-library/react';
import { TimePicker } from './TimePicker';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';

describe('TimePicker', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('отображает выбранные значения времени', () => {
    render(<TimePicker value={{ start: '10:00', end: '12:30' }} />);

    const startInput = screen.getByPlaceholderText('От') as HTMLInputElement;
    const endInput = screen.getByPlaceholderText('До') as HTMLInputElement;

    expect(startInput.value).toBe('10:00');
    expect(endInput.value).toBe('12:30');
  });

  test('второй селект (До) заблокирован, если не выбрано время "От"', () => {
    render(<TimePicker value={{ start: '', end: '' }} />);

    const endInput = screen.getByPlaceholderText('До');
    expect(endInput).toBeDisabled();
  });

  test('фильтрует опции "До", чтобы они были позже, чем "От"', async () => {
    render(
      <TimePicker value={{ start: '22:00', end: '' }} onChange={onChange} />,
    );

    const endInput = screen.getByPlaceholderText('До');

    fireEvent.focus(endInput);
    fireEvent.keyDown(endInput, { key: 'ArrowDown' });

    const optionsList = await screen.findByTestId('select-options');

    expect(within(optionsList).queryByText('21:00')).not.toBeInTheDocument();
    expect(within(optionsList).getByText('23:30')).toBeInTheDocument();
  });

  test('сбрасывает "До", если выбрано новое время "От", которое позже текущего "До"', async () => {
    render(
      <TimePicker
        value={{ start: '10:00', end: '11:00' }}
        onChange={onChange}
      />,
    );

    const startInput = screen.getByPlaceholderText('От');

    fireEvent.focus(startInput);
    fireEvent.keyDown(startInput, { key: 'ArrowDown' });

    const option12 = await screen.findByText('12:00');

    fireEvent.mouseDown(option12);
    fireEvent.click(option12);

    expect(onChange).toHaveBeenCalledWith({
      start: '12:00',
      end: '',
    });
  });

  test('отображает ошибку', () => {
    const errorMsg = 'Выберите корректный интервал';
    render(<TimePicker error={errorMsg} />);

    expect(screen.getByText(errorMsg)).toBeInTheDocument();
    expect(screen.getByText(errorMsg)).toHaveStyle(
      '--txt-color: var(--danger)',
    );
  });
});
