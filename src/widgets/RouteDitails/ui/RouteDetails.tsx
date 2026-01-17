import { Grid, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

export const RouteDetails = () => {
  return (
    <Grid cols={2} gap={16}>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Начало
        </Text>
        <Text color="text-tertiary">19:34, 12 апреля</Text>
      </HStack>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" leader>
          Расстояние
        </Text>
        <Text color="text-tertiary">26 км</Text>
      </HStack>
    </Grid>
  );
};
