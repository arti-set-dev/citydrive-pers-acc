import { getGrid } from '@/shared/lib/stack/grid/getGrid';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Status } from '@/shared/ui/Status/Status';
import { Text } from '@/shared/ui/Text/Text';

const grid = getGrid({
  cols: { base: 4, lg: 2, sm: 1 },
  gap: 16,
});

export const RideInfo = () => {
  return (
    <Card
      p={24}
      r={16}
      variant="bg-outline"
      className={grid.className}
      style={grid.style}
    >
      <VStack gap={16}>
        <Text size={14} color="text-tertiary">
          Сотрудник
        </Text>
        <Text color="brand" weight="bold">
          Горшков Тарас Степанович
        </Text>
        <Text>+7 999 999 99 99</Text>
      </VStack>
      <VStack gap={16}>
        <Text size={14} color="text-tertiary">
          Машина
        </Text>
        <Text weight="bold">Mercedes-Benz E-Class</Text>
        <Text>M309KP197</Text>
      </VStack>
      <VStack gap={16}>
        <Text size={14} color="text-tertiary">
          Статус
        </Text>
        <HStack>
          <Status status="inactive" />
          <Text weight="bold">Mercedes-Benz E-Class</Text>
        </HStack>
      </VStack>
      <VStack gap={16}>
        <Text size={14} color="text-tertiary">
          Стоимость
        </Text>
        <Text weight="bold">828 р</Text>
      </VStack>
    </Card>
  );
};
