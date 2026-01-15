import { Flex, Grid, VStack } from '@/shared/ui/Stack';
import { DepartmentItem } from '../DepartmentItem/DepartmentItem';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';

export const DepartmentList = () => {
  return (
    <Card p={0} isOverflowAuto>
      <Card minWidth={770}>
        <VStack>
          <Grid cols={5}>
            <Card p={16}>
              <Text color="text-tertiary" weight="medium" size={18}>
                Название отдела
              </Text>
            </Card>
            <Card p={16}>
              <Text color="text-tertiary" weight="medium" size={18}>
                Сотруники
              </Text>
            </Card>
            <Card p={16}>
              <Text color="text-tertiary" weight="medium" size={18}>
                Лимит р/мес.
              </Text>
            </Card>
            <Card p={16}>
              <Text color="text-tertiary" weight="medium" size={18}>
                Траты за месяц
              </Text>
            </Card>
            <Card p={16}>
              <Flex align="end">
                <Text color="text-tertiary" weight="medium" size={18}>
                  Отдел продаж
                </Text>
              </Flex>
            </Card>
          </Grid>
        </VStack>
        <VStack gap={0}>
          <DepartmentItem />
          <DepartmentItem />
          <DepartmentItem />
          <DepartmentItem />
          <DepartmentItem />
        </VStack>
      </Card>
    </Card>
  );
};
