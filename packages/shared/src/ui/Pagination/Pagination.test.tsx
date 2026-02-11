import { screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';

describe('Pagination', () => {
  test('рендерит первую и последнюю страницы всегда', () => {
    render(<Pagination currentPage={5} totalPages={10} />);

    expect(screen.getByTestId('pagination-page-1')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-10')).toBeInTheDocument();
  });

  test('подсвечивает текущую страницу', () => {
    render(<Pagination currentPage={3} totalPages={5} />);

    const activePage = screen.getByTestId('pagination-page-3');
    expect(activePage).toHaveClass(/current/);
  });

  test('скрывает стрелку "назад" на первой странице и показывает на второй', () => {
    const { rerender } = render(<Pagination currentPage={1} totalPages={5} />);

    expect(screen.queryByTestId('pagination-prev')).not.toBeInTheDocument();

    rerender(<Pagination currentPage={2} totalPages={5} />);
    expect(screen.getByTestId('pagination-prev')).toBeInTheDocument();
  });

  test('показывает многоточие при большом количестве страниц', () => {
    render(<Pagination currentPage={1} totalPages={10} />);

    expect(screen.getByTestId('pagination-page-2')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination-page-4')).not.toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-10')).toBeInTheDocument();
  });

  test('формирует правильные ссылки для навигации через стрелки', () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    const nextBtn = screen.getByTestId('pagination-next');
    const prevBtn = screen.getByTestId('pagination-prev');

    expect(nextBtn).toHaveAttribute('href', '/?page=3');
    expect(prevBtn).toHaveAttribute('href', '/?page=1');
  });

  test('не отображает кнопку "вперед" на последней странице', () => {
    render(<Pagination currentPage={5} totalPages={5} />);

    expect(screen.queryByTestId('pagination-next')).not.toBeInTheDocument();
  });

  test('логика ссылок для конкретных страниц', () => {
    render(<Pagination currentPage={4} totalPages={5} />);

    const page4 = screen.getByTestId('pagination-page-4');
    expect(page4).toHaveAttribute('href', '/?page=4');
    expect(page4).toHaveClass(/current/);
  });
});
