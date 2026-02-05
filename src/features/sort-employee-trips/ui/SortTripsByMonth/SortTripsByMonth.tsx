import { Card } from '@/shared/ui/Card/Card';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { DateRange } from 'react-day-picker';

interface SortTripsByMonthProps {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
  minDate?: Date;
  'data-testid'?: string;
}

export const SortTripsByMonth = ({
  value,
  onChange,
  minDate,
  'data-testid': testId = 'SortTripsByMonth',
}: SortTripsByMonthProps) => {
  return (
    <Card p={0} width={540}>
      <DatePicker
        data-testid={`${testId}.DatePicker`}
        fullWidth
        value={value}
        onChange={onChange}
        disabledBefore={minDate}
      />
    </Card>
  );
};
