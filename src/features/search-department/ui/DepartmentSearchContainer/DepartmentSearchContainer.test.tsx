/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, fireEvent, act } from '@testing-library/react';
import { DepartmentSearchContainer } from './DepartmentSearchContainer';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';

jest.mock('@citydrive/entities/Department', () => ({
  ...jest.requireActual('@citydrive/entities/Department'),
  DepartmentList: ({ search, companyId }: any) => (
    <div data-testid="DepartmentList">
      <span data-testid="search-value">{search}</span>
      <span data-testid="company-id">{companyId}</span>
    </div>
  ),
}));

describe('DepartmentSearchContainer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const renderActions = () => <button>Action</button>;

  test('should pass companyId from redux to list', () => {
    render(<DepartmentSearchContainer renderActions={renderActions} />, {
      initialState: {
        employee: { data: { companyId: '123' } },
      },
    });

    expect(screen.getByTestId('company-id')).toHaveTextContent('123');
  });

  test('should debounce search input', () => {
    render(<DepartmentSearchContainer renderActions={renderActions} />);

    const input = screen.getByTestId('SearchDepartment.Input');

    fireEvent.change(input, { target: { value: 'IT' } });

    expect(screen.getByTestId('search-value')).toHaveTextContent('');

    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(screen.getByTestId('search-value')).toHaveTextContent('');

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByTestId('search-value')).toHaveTextContent('IT');
  });

  test('renderActions should be called in list', () => {
    render(<DepartmentSearchContainer renderActions={renderActions} />);
    expect(screen.getByTestId('DepartmentList')).toBeInTheDocument();
  });
});
