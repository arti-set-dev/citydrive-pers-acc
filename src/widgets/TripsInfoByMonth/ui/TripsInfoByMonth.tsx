import { getGrid } from '@/shared/lib/stack/grid/getGrid';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

const stack = getGrid({
  cols: 3,
  gap: 16,
});

export const TripsInfoByMonth = () => {
  return (
    <Card
      p={24}
      variant="bg-outline"
      r={24}
      className={stack.className}
      style={stack.style}
    >
      <VStack>
        <Text weight="bold" size={18}>
          36
        </Text>
        <Text color="text-tertiary">поездок в июне</Text>
      </VStack>
      <VStack>
        <Text weight="bold" size={18}>
          768
        </Text>
        <Text color="text-tertiary">потрачено в июне</Text>
      </VStack>
      <VStack>
        <Text weight="bold" size={18}>
          3 368
        </Text>
        <Text color="text-tertiary">осталось в июне</Text>
      </VStack>
    </Card>
  );
};
