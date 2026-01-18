import { render, screen } from '@/shared/utils/jest/providers/JestProvider';
import { AppLink } from './AppLink';

describe('AppLink', () => {
  test('простой рендер ссылки', () => {
    render(<AppLink to="/about">About</AppLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/about');
  });

  test('проверка активного состояния через опцию route', () => {
    render(
      <AppLink to="/settings" activeClassName="is-active">
        Settings
      </AppLink>,
      { route: '/settings' },
    );

    expect(screen.getByRole('link')).toHaveClass('is-active');
  });
});
