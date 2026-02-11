import { screen, fireEvent } from '@testing-library/react';
import { Field } from './Field';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';

describe('Field', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('рендерит обычный текстовый инпут и вызывает onChange', () => {
    render(<Field value="" onChange={onChange} placeholder="Введите текст" />);

    const input = screen.getByPlaceholderText('Введите текст');
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(onChange).toHaveBeenCalledWith('Hello');
  });

  test('рендерит иконку, если она передана', () => {
    const MockIcon = () => <svg data-testid="field-icon" />;
    render(<Field icon={MockIcon} />);

    expect(screen.getByTestId('field-icon')).toBeInTheDocument();
  });

  test('отображает ошибку и применяет стили', () => {
    const errorText = 'Ошибка валидации';
    render(<Field error={errorText} />);

    const errorElement = screen.getByText(errorText);
    expect(errorElement).toBeInTheDocument();

    expect(errorElement).toHaveStyle('--txt-color: var(--danger)');

    expect(errorElement).toHaveClass(/Text/);
  });

  describe('Phone Input (type="tel")', () => {
    test('рендерит маску и селект кодов при типе tel', () => {
      render(<Field type="tel" value="" onChange={onChange} />);

      expect(
        screen.getByPlaceholderText('(999) 000-00-00'),
      ).toBeInTheDocument();
      expect(screen.getByText('+7')).toBeInTheDocument();
    });

    test('форматирует ввод согласно маске', () => {
      render(<Field type="tel" value="9991234455" onChange={onChange} />);

      const input = screen.getByPlaceholderText(
        '(999) 000-00-00',
      ) as HTMLInputElement;
      expect(input.value).toBe('(999) 123-44-55');
    });

    test('меняет формат ввода при смене страны', async () => {
      render(<Field type="tel" onChange={onChange} />);

      fireEvent.click(screen.getByTestId('select-button'));

      const optionUS = await screen.findByTestId('select-option-2');
      fireEvent.click(optionUS);

      const input = screen.getByTestId('field-input-tel');
      fireEvent.change(input, { target: { value: '1234567890' } });

      expect(input).toHaveValue('123 456-7890');
    });
  });

  test('атрибут readOnly блокирует ввод', () => {
    render(<Field readOnly value="static" onChange={onChange} />);
    const input = screen.getByDisplayValue('static');

    expect(input).toHaveAttribute('readonly');
  });
});
