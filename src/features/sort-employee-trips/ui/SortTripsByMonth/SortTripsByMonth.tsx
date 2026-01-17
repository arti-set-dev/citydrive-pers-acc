import { Card } from '@/shared/ui/Card/Card';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';

export const SortTripsByMonth = () => {
  return (
    <Card p={0} width={540}>
      <DatePicker fullWidth />
    </Card>
  );
};
