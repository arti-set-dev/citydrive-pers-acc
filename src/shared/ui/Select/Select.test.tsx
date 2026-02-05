import { screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Select } from './Select';
import { render } from '@/shared/utils/jest/providers/JestProvider';

const options = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' },
];

describe('Select', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  describe('Listbox mode (no placeholder)', () => {
    test('отображает дефолтную опцию или описание', () => {
      render(<Select options={options} desc="Выберите значение" />);
      expect(screen.getByText('Выберите значение')).toBeInTheDocument();
    });

    test('открывает список при клике на кнопку', async () => {
      render(<Select options={options} />);

      const button = screen.getByTestId('select-button');
      fireEvent.click(button);

      const optionsList = await screen.findByTestId('select-options');
      expect(optionsList).toBeInTheDocument();

      expect(within(optionsList).getByText('Option 1')).toBeInTheDocument();
      expect(within(optionsList).getByText('Option 2')).toBeInTheDocument();
    });

    test('вызывает onChange при выборе опции', async () => {
      render(<Select options={options} onChange={onChange} />);

      fireEvent.click(screen.getByTestId('select-button'));
      const option2 = await screen.findByTestId('select-option-2');
      fireEvent.click(option2);

      expect(onChange).toHaveBeenCalledWith(options[1]);
    });
  });

  describe('Combobox mode (with placeholder)', () => {
    test('фильтрует опции при вводе текста', async () => {
      render(<Select options={options} placeholder="Поиск..." />);

      const input = screen.getByTestId('select-input');
      fireEvent.change(input, { target: { value: 'Option 3' } });

      await waitFor(() => {
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
      });
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    test('отображает выбранное значение в инпуте', () => {
      render(<Select options={options} selected="2" placeholder="Поиск..." />);
      const input = screen.getByTestId('select-input') as HTMLInputElement;
      expect(input.value).toBe('Option 2');
    });
  });

  test('отображает сообщение об ошибке', () => {
    const errorText = 'Поле обязательно';
    render(<Select options={options} error={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });

  test('не открывается, если disabled', () => {
    render(<Select options={options} disabled />);
    const button = screen.getByTestId('select-button');
    fireEvent.click(button);
    expect(screen.queryByTestId('select-options')).not.toBeInTheDocument();
  });
});
