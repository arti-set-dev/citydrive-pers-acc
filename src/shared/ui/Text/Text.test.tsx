import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  test('рендерит контент и применяет базовый тег div', () => {
    render(<Text data-testid="text-element">Hello World</Text>);

    const element = screen.getByTestId('text-element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveTextContent('Hello World');
  });

  test('поддерживает полиморфизм через пропс as', () => {
    render(
      <Text as="span" data-testid="text-span">
        Span Text
      </Text>,
    );

    const element = screen.getByTestId('text-span');
    expect(element.tagName).toBe('SPAN');
  });

  test('корректно мапит токены в CSS-переменные (size, color)', () => {
    render(
      <Text size={16} color="brand" data-testid="text-styled">
        Styled Text
      </Text>,
    );

    const element = screen.getByTestId('text-styled');

    expect(element).toHaveStyle('--txt-size: var(--font-size-16)');
    expect(element).toHaveStyle('--txt-color: var(--brand)');
  });

  test('обрабатывает адаптивные (Responsive) пропсы', () => {
    render(
      <Text
        size={{ base: 14, md: 18, lg: 24 }}
        align={{ base: 'left', lg: 'center' }}
        data-testid="text-responsive"
      >
        Responsive Text
      </Text>,
    );

    const element = screen.getByTestId('text-responsive');

    expect(element).toHaveStyle('--txt-size: var(--font-size-14)');
    expect(element).toHaveStyle('--txt-align: left');

    expect(element).toHaveStyle('--txt-size-md: var(--font-size-18)');
    expect(element).toHaveStyle('--txt-size-lg: var(--font-size-24)');
    expect(element).toHaveStyle('--txt-align-lg: center');
  });

  test('применяет класс leader при передаче пропса', () => {
    render(
      <Text leader data-testid="text-leader">
        Leader Text
      </Text>,
    );

    const element = screen.getByTestId('text-leader');
    expect(element).toHaveClass('leader');
  });

  test('прокидывает кастомные стили и классы', () => {
    render(
      <Text
        className="custom-class"
        style={{ marginTop: '10px' }}
        data-testid="text-custom"
      >
        Custom
      </Text>,
    );

    const element = screen.getByTestId('text-custom');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveStyle('margin-top: 10px');
  });
});
