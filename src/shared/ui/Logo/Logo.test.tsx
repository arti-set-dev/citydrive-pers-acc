import { screen } from '@testing-library/react';
import { Logo } from './Logo';
import { PATHS } from '@/shared/lib/router/paths';
import { render } from '@/shared/utils/jest/providers/JestProvider';

describe('Logo', () => {
  test('рендерится как ссылка, если путь не совпадает с исключениями', () => {
    render(<Logo />, { route: '/settings' });

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByText('для бизнеса')).toBeInTheDocument();
  });

  test('рендерится БЕЗ ссылки на главной странице', () => {
    render(<Logo />, { route: PATHS.home });

    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();

    expect(screen.getByText('для бизнеса')).toBeInTheDocument();
  });

  test('рендерится БЕЗ ссылки на странице авторизации', () => {
    render(<Logo />, { route: PATHS.auth });

    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();
  });

  test('отображает название компании, если оно передано', () => {
    const company = 'ООО Рога и Копыта';
    render(<Logo companyName={company} />);

    expect(screen.getByText(company)).toBeInTheDocument();
  });

  test('имеет правильный alt у логотипа', () => {
    render(<Logo />);

    const image = screen.getByAltText('Логотип Ситидрайв');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/logo.png');
  });
});
