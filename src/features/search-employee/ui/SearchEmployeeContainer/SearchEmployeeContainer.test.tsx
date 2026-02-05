/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, fireEvent, act } from '@testing-library/react';
import { SearchEmployeeContainer } from './SearchEmployeeContainer';
import { render } from '@/shared/utils/jest/providers/JestProvider';

jest.mock('@/entities/Employee', () => ({
  ...jest.requireActual('@/entities/Employee'),
  EmployeeList: ({ filters, activeKeys }: any) => (
    <div data-testid="EmployeeList">
      <span data-testid="filter-name">{filters.name}</span>
      <span data-testid="filter-dept">{filters.departmentId}</span>
      <span data-testid="active-keys-count">{activeKeys.length}</span>
    </div>
  ),
}));

describe('SearchEmployeeContainer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const defaultProps = {
    departmentId: 'dept-123',
  };

  test('should render with initial props and default activeKeys', () => {
    render(<SearchEmployeeContainer {...defaultProps} />);

    expect(screen.getByTestId('filter-dept')).toHaveTextContent('dept-123');
    expect(screen.getByTestId('active-keys-count')).toHaveTextContent('5');
  });

  test('should debounce search input for employee name', () => {
    render(<SearchEmployeeContainer {...defaultProps} />);

    const input = screen.getByTestId('SearchEmployee.Input');

    fireEvent.change(input, { target: { value: 'Ivan' } });

    expect(screen.getByTestId('filter-name')).toHaveTextContent('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('filter-name')).toHaveTextContent('Ivan');
  });

  test('should update when departmentId changes', () => {
    const { rerender } = render(<SearchEmployeeContainer departmentId="1" />);
    expect(screen.getByTestId('filter-dept')).toHaveTextContent('1');

    rerender(<SearchEmployeeContainer departmentId="2" />);
    expect(screen.getByTestId('filter-dept')).toHaveTextContent('2');
  });
});
