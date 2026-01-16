import { Grid, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import styles from './RouteDetails.module.scss';

export const RouteDetails = () => {
  return (
    <Grid cols={2} gap={16}>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" className={styles.RouteDetailsTerm}>
          Начало
        </Text>
        <Text color="text-tertiary">19:34, 12 апреля</Text>
      </HStack>
      <HStack justify="space-between" gap={0}>
        <Text color="text-tertiary" className={styles.RouteDetailsTerm}>
          Расстояние
        </Text>
        <Text color="text-tertiary">26 км</Text>
      </HStack>
    </Grid>
  );
};
