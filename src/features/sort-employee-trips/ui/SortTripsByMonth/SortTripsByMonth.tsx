import { Card } from '@/shared/ui/Card/Card';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { DateRange } from 'react-day-picker';

interface SortTripsByMonthProps {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
  minDate?: Date;
}

export const SortTripsByMonth = ({
  value,
  onChange,
  minDate,
}: SortTripsByMonthProps) => {
  return (
    <Card p={0} width={540}>
      <DatePicker
        fullWidth
        value={value}
        onChange={onChange}
        disabledBefore={minDate}
      />
    </Card>
  );
};
