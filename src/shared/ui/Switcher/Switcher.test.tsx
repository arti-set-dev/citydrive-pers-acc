import { render, screen, fireEvent } from '@testing-library/react';
import { Switcher } from './Switcher';

describe('Switcher', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('отображает состояние включено/выключено согласно пропсу checked', () => {
    const { rerender } = render(<Switcher checked={true} />);
    const switcher = screen.getByTestId('switcher');

    expect(switcher).toHaveAttribute('aria-checked', 'true');

    rerender(<Switcher checked={false} />);
    expect(switcher).toHaveAttribute('aria-checked', 'false');
  });

  test('вызывает onChange при клике', () => {
    render(<Switcher checked={false} onChange={onChange} />);

    const switcher = screen.getByTestId('switcher');
    fireEvent.click(switcher);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  test('использует defaultChecked, если checked не передан', () => {
    render(<Switcher defaultChecked={true} />);
    const switcher = screen.getByTestId('switcher');

    expect(switcher).toHaveAttribute('aria-checked', 'true');
  });

  test('прокидывает атрибуты name и value', () => {
    render(<Switcher name="notifications" value="enabled" />);

    const hiddenInput = screen.getByDisplayValue('enabled');

    expect(hiddenInput).toHaveAttribute('name', 'notifications');
    expect(hiddenInput).toHaveAttribute('type', 'checkbox');
  });

  test('ползунок (thumb) присутствует внутри с правильным классом', () => {
    render(<Switcher />);
    const thumb = screen.getByTestId('switcher-thumb');

    expect(thumb).toBeInTheDocument();
    expect(thumb).toHaveClass('Thumb');
  });
});
