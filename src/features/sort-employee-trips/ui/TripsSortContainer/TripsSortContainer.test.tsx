/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, fireEvent } from '@testing-library/react';
import { TripsSortContainer } from './TripsSortContainer';
import { useGetRoutesQuery } from '@citydrive/entities/Route';
import { render } from '@citydrive/shared/utils/jest/providers/JestProvider';

jest.mock('@citydrive/entities/Route/api/routeApi', () => ({
  useGetRoutesQuery: jest.fn(),
}));

jest.mock('react-day-picker', () => ({
  DayPicker: ({ onSelect }: any) => (
    <button
      data-testid="mock-day-picker-select"
      onClick={() =>
        onSelect({
          from: new Date('2023-10-01'),
          to: new Date('2023-10-10'),
        })
      }
    >
      Select Range
    </button>
  ),
}));

jest.mock('@citydrive/entities/Route', () => ({
  ...jest.requireActual('@citydrive/entities/Route'),
  RouteList: ({ filters }: any) => (
    <div data-testid="RouteList">
      <span data-testid="filter-start-date">{filters.startDate}</span>
      <span data-testid="filter-end-date">{filters.endDate}</span>
    </div>
  ),
}));

describe('TripsSortContainer Integration', () => {
  const mockRoutes = [
    { id: '1', date: '2023-10-15', price: 100 },
    { id: '2', date: '2023-09-01', price: 200 },
  ];

  beforeEach(() => {
    (useGetRoutesQuery as jest.Mock).mockReturnValue({
      data: mockRoutes,
      isLoading: false,
    });
  });

  test('should update RouteList filters when range is selected in DatePicker', async () => {
    render(<TripsSortContainer employeeId="123" />);

    const startField = screen.getByTestId(
      'SortTripsByMonth.DatePicker.StartField',
    );

    fireEvent.click(startField);

    fireEvent.click(screen.getByTestId('mock-day-picker-select'));

    expect(screen.getByTestId('filter-start-date')).toHaveTextContent(
      '2023-10-01',
    );
    expect(screen.getByTestId('filter-end-date')).toHaveTextContent(
      '2023-10-10',
    );
  });
});
