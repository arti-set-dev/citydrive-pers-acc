import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { Card } from '@/shared/ui/Card/Card';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { Grid, HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import React from 'react';

const data = [
  {
    id: '1',
    time: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
  },
  {
    id: '2',
    time: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
  },
  {
    id: '3',
    time: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
  },
  {
    id: '4',
    time: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
  },
  {
    id: '5',
    time: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
  },
  {
    id: '6',
    time: '15:32',
    name: 'Константин Герман Феликсовыич',
    price: '3000 р',
  },
];

const alignStack = getFlex({
  align: 'end',
});

const directionStack = getFlex({
  direction: 'column',
  gap: 16,
});

export const EmployeeList = () => {
  return (
    <Card
      p={0}
      className={directionStack.className}
      style={directionStack.style}
    >
      <Grid cols={3}>
        <Card p={16} color="text-tertiary" borderLine="bottom">
          <Text color="text-tertiary">Время</Text>
        </Card>
        <Card p={16} color="text-tertiary" borderLine="bottom">
          <Text color="text-tertiary">Сотрудник</Text>
        </Card>
        <Card
          p={16}
          color="text-tertiary"
          borderLine="bottom"
          className={alignStack.className}
          style={alignStack.style}
        >
          <Text color="text-tertiary">Стоимость</Text>
        </Card>
      </Grid>
      <Grid cols={3}>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <Card p={16} borderLine="bottom">
              <Text>{item.time}</Text>
            </Card>
            <Card
              p={16}
              borderLine="bottom"
              className={directionStack.className}
              style={directionStack.style}
            >
              <Text>{item.name}</Text>
              <Text color="text-tertiary">Status</Text>
            </Card>
            <Card p={16} borderLine="bottom">
              <Text className={alignStack.className} style={alignStack.style}>
                {item.price}
              </Text>
            </Card>
          </React.Fragment>
        ))}
      </Grid>
      <HStack justify="space-between">
        <Pagination currentPage="3" totalPages={10} />
        <Text color="text-tertiary">1-50 из 883</Text>
      </HStack>
    </Card>
  );
};
