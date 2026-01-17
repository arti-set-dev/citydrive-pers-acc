import { getHStack } from '@/shared/lib/stack/flex/getHStack';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';

const stack = getHStack({
  gap: 16,
  justify: 'space-between',
});

export const InvoiceItem = () => {
  return (
    <Card
      p={16}
      variant="bg-outline"
      className={stack.className}
      style={stack.style}
      r={16}
    >
      <Text weight="medium" size={28}>
        Отчёт от 09.02.2024
      </Text>
      <Button offset={8}>Скачать отчёт</Button>
    </Card>
  );
};
