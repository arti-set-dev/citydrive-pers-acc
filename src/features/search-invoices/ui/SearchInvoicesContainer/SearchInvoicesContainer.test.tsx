/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, fireEvent, act } from '@testing-library/react';
import { SearchInvoicesContainer } from './SearchInvoicesContainer';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';

jest.mock('@citydrive/entities/Invoice', () => ({
  InvoiceList: ({ search, companyId, targetIds }: any) => (
    <div data-testid="InvoiceList">
      <span data-testid="invoice-search">{search}</span>
      <span data-testid="invoice-company">{companyId}</span>
      <span data-testid="invoice-targets">{targetIds?.join(',')}</span>
    </div>
  ),
}));

jest.mock(
  '@citydrive/entities/Invoice/ui/InvoiceDocument/InvoiceDocument',
  () => ({
    InvoiceDocument: () => null,
  }),
);

describe('SearchInvoicesContainer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const defaultProps = {
    companyId: 'comp-777',
    targetIds: ['id-1', 'id-2'],
  };

  test('should render with initial props (companyId and targetIds)', () => {
    render(<SearchInvoicesContainer {...defaultProps} />);

    expect(screen.getByTestId('invoice-company')).toHaveTextContent('comp-777');
    expect(screen.getByTestId('invoice-targets')).toHaveTextContent(
      'id-1,id-2',
    );
    expect(screen.getByTestId('invoice-search')).toHaveTextContent('');
  });

  test('should debounce search input for invoices', () => {
    render(<SearchInvoicesContainer {...defaultProps} />);

    const input = screen.getByTestId('SearchInvoices.Input');

    fireEvent.change(input, { target: { value: 'INV-2024' } });

    expect(screen.getByTestId('invoice-search')).toHaveTextContent('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('invoice-search')).toHaveTextContent('INV-2024');
  });

  test('should update search when typing immediately but list updates after debounce', () => {
    render(<SearchInvoicesContainer {...defaultProps} />);
    const input = screen.getByTestId('SearchInvoices.Input');

    fireEvent.change(input, { target: { value: 'New Search' } });

    expect(input).toHaveValue('New Search');

    expect(screen.getByTestId('invoice-search')).toHaveTextContent('');
  });
});
