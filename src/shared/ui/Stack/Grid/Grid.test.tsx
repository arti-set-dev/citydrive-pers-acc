import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  test('рендерит контент и применяет базовые стили', () => {
    render(
      <Grid cols={3} gap={16} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>,
    );

    const grid = screen.getByTestId('grid');

    expect(grid).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    expect(grid).toHaveStyle('--grid-cols: 3');
    expect(grid).toHaveStyle('--grid-gap: 16px');
  });

  test('корректно обрабатывает адаптивные колонки (Responsive cols)', () => {
    render(<Grid cols={{ base: 1, sm: 2, md: 4, lg: 6 }} data-testid="grid" />);

    const grid = screen.getByTestId('grid');

    expect(grid).toHaveStyle('--grid-cols: 1');
    expect(grid).toHaveStyle('--grid-cols-sm: 2');
    expect(grid).toHaveStyle('--grid-cols-md: 4');
    expect(grid).toHaveStyle('--grid-cols-lg: 6');
  });

  test('корректно обрабатывает адаптивные отступы (Responsive gap)', () => {
    render(<Grid gap={{ base: 0, md: 8, lg: 32 }} data-testid="grid" />);

    const grid = screen.getByTestId('grid');

    expect(grid).toHaveStyle('--grid-gap: 0px');
    expect(grid).toHaveStyle('--grid-gap-md: 8px');
    expect(grid).toHaveStyle('--grid-gap-lg: 32px');
  });

  test('корректно обрабатывает адаптивные отступы', () => {
    render(<Grid gap={{ base: 0, md: 8, lg: 16 }} data-testid="grid" />);

    const grid = screen.getByTestId('grid');

    expect(grid).toHaveStyle('--grid-gap: 0px');
    expect(grid).toHaveStyle('--grid-gap-md: 8px');
    expect(grid).toHaveStyle('--grid-gap-lg: 16px');
  });

  test('прокидывает кастомный className', () => {
    render(<Grid className="my-grid" data-testid="grid" />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('Grid');
    expect(grid).toHaveClass('my-grid');
  });
});
