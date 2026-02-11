import { render, screen } from '@testing-library/react';
import { Flex } from './Flex';

describe('Flex', () => {
  test('рендерит div по умолчанию и прокидывает стили', () => {
    render(
      <Flex gap={8} direction="column" data-testid="flex-box">
        <span>Content</span>
      </Flex>,
    );

    const element = screen.getByTestId('flex-box');

    expect(element.tagName).toBe('DIV');

    expect(element).toHaveStyle('--df-gap: 8px');
    expect(element).toHaveStyle('--df-dir: column');
    expect(element).toHaveStyle('--df-justify: start');
  });

  test('поддерживает полиморфизм (рендерит как ul)', () => {
    render(
      <Flex as="ul" p={16} data-testid="flex-list">
        <li>Item</li>
      </Flex>,
    );

    const element = screen.getByTestId('flex-list');

    expect(element.tagName).toBe('UL');
    expect(element).toHaveStyle('--df-padding: 16px');
  });

  test('корректно обрабатывает адаптивные значения (Responsive)', () => {
    render(
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 4, lg: 16 }}
        data-testid="flex-responsive"
      />,
    );

    const element = screen.getByTestId('flex-responsive');

    expect(element).toHaveStyle('--df-dir: column');
    expect(element).toHaveStyle('--df-gap: 4px');

    expect(element).toHaveStyle('--df-dir-md: row');
    expect(element).toHaveStyle('--df-gap-lg: 16px');
  });

  test('не прокидывает padding/margin, если это не список', () => {
    // @ts-expect-error: p не существует для div по типам, но проверим рантайм
    render(<Flex as="div" p={20} data-testid="flex-div" />);

    const element = screen.getByTestId('flex-div');
    expect(element.style.getPropertyValue('--df-padding')).toBe('');
  });

  test('прокидывает кастомный className и доп. атрибуты', () => {
    render(<Flex className="custom-class" id="test-id" data-testid="flex" />);

    const element = screen.getByTestId('flex');
    expect(element).toHaveClass('Flex');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveAttribute('id', 'test-id');
  });
});
