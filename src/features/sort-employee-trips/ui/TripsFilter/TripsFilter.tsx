import { RouteList } from '@/entities/Route';
// eslint-disable-next-line boundaries/entry-point
import { IRoute } from '@/entities/Route/ui/RouteList/RouteList';
import { Select } from '@/shared/ui/Select/Select';
import { Flex, Grid, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { useState } from 'react';

const days = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
];

const price = [
  { id: 1, name: 'По убыванию' },
  { id: 2, name: 'По возростанию' },
];

const data: IRoute[] = [
  {
    id: '1',
    price: '2 186 р',
    routeStart: {
      id: '1',
      address: 'Ул. Пенькова, 28',
      city: 'Москва',
      date: '18 сентября',
      time: '15:32',
    },
    routeEnd: {
      id: '2',
      address: 'Ул. Рассольникова, 28',
      city: 'Санкт-Петербург',
    },
  },
  {
    id: '2',
    price: '2 186 р',
    routeStart: {
      id: '1',
      address: 'Ул. Пенькова, 28',
      city: 'Москва',
      date: '18 сентября',
      time: '15:32',
    },
    routeEnd: {
      id: '2',
      address: 'Ул. Бакинских Комиссаров, 3',
      city: 'Санкт-Петербург',
    },
  },
  {
    id: '3',
    price: '2 186 р',
    routeStart: {
      id: '1',
      address: 'Ул. Пенькова, 28',
      city: 'Москва',
      date: '18 сентября',
      time: '15:32',
    },
    routeEnd: {
      id: '2',
      address: 'Ул. Рассольникова, 28',
      city: 'Санкт-Петербург',
    },
  },
];

export const TripsFilter = () => {
  const [dateSelected] = useState(null);
  const [priceSelected] = useState(null);
  return (
    <VStack>
      <Grid cols={3}>
        <Flex align="start">
          <Select
            offset={0}
            desc="Дата"
            selected={dateSelected}
            // onChange={setDateSelected}
            variant="clear"
            options={days}
          />
        </Flex>
        <Flex align="center">
          <Text color="text-tertiary">Откуда - куда</Text>
        </Flex>
        <Flex align="end">
          <Select
            desc="Стоимость"
            selected={priceSelected}
            // onChange={setPriceSelected}
            variant="clear"
            offset={0}
            options={price}
          />
        </Flex>
      </Grid>
      <RouteList data={data} reverse />
    </VStack>
  );
};
