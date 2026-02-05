import { render, screen } from '@testing-library/react';
import { Status } from './Status';

describe('Status', () => {
  test('отображает активный статус с правильным заголовком и классом', () => {
    render(<Status status="active" />);

    const element = screen.getByTestId('status-indicator');

    expect(element).toHaveClass('Status');
    expect(element).toHaveClass('active');

    expect(element).toHaveAttribute('title', 'Активен');
  });

  test('отображает неактивный статус', () => {
    render(<Status status="inactive" />);

    const element = screen.getByTestId('status-indicator');

    expect(element).toHaveClass('Status');
    expect(element).toHaveClass('inactive');
    expect(element).toHaveAttribute('title', 'Не активен');
  });
});
