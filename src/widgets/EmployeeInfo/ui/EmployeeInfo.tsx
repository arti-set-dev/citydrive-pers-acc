import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { Flex, Grid } from '@/shared/ui/Stack';
import { Status } from '@/shared/ui/Status/Status';
import { Text } from '@/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

export const EmployeeInfo = () => {
  return (
    <Card
      p={24}
      r={24}
      variant="bg-outline"
      className={stack.className}
      style={stack.style}
    >
      <Text as="h2" weight="bold" size={24}>
        Данные сотрудника
      </Text>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Статус
        </Text>
        <Flex align="center" direction={{ base: 'row', lg: 'row' }} gap={16}>
          <Text>Активен</Text>
          <Status status="active" />
        </Flex>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Телефон
        </Text>
        <Text>+ 7 999 999 99 99</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Email
        </Text>
        <Text>Email@mail.com</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Роль
        </Text>
        <Text>Администратор</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Отдел
        </Text>
        <Text>Бухгалтерия</Text>
      </Grid>
      <Text as="h2" weight="bold" size={24}>
        Личный лимит
      </Text>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Лимит
        </Text>
        <Text>100 000 р/мес</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Потрачено
        </Text>
        <Text>15 690 р</Text>
      </Grid>
      <Text as="h2" weight="bold" size={24}>
        Личные настройки доступа
      </Text>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Время
        </Text>
        <Text>с 12:00 до 18:00</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Дни
        </Text>
        <Text>пн, вт, ср, чт, пт</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Машины
        </Text>
        <Text>Комфорт, Эконом, Прремиум</Text>
      </Grid>
      <Grid cols={2}>
        <Text color="text-tertiary" leader>
          Город
        </Text>
        <Text>Москва, Санкт-Петербург</Text>
      </Grid>
    </Card>
  );
};
