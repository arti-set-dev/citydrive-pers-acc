import { Card } from '@/shared/ui/Card/Card';
import { Grid, HStack } from '@/shared/ui/Stack';
import { Stat } from '@/widgets/Stat';
import IdCardLanyardIcon from '@/shared/assets/icons/id-card-lanyard.svg';
import CarFrontIcon from '@/shared/assets/icons/car-front.svg';
import { Text } from '@/shared/ui/Text/Text';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteTrips } from '@/shared/lib/router/paths';
import { EmployeeList } from '@/entities/Employee';

const stack = getVStack({
  gap: 16,
});

const HomePage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" size={32} weight="bold">
        Главная
      </Text>
      <Grid cols={{ base: 3, lg: 2, sm: 1 }} gap={16}>
        <Stat
          subject="15 активных"
          statMain="36"
          desc="Сотрудники"
          icon={IdCardLanyardIcon}
        />
        <Stat
          subject="Поездки в июне"
          statMain="768"
          desc="23 сегодня"
          icon={CarFrontIcon}
        />
        <Stat subject="Траты в июне" statMain="23 368 р" />
      </Grid>
      <HStack align="center" justify="space-between">
        <Text as="h2" size={32} weight="bold">
          Недавние поездки
        </Text>
        <AppLink to={getRouteTrips()}>Смотреть все {'>'}</AppLink>
      </HStack>
      <EmployeeList />
    </Card>
  );
};

export default HomePage;
