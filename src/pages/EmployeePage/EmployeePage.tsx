import { getRouteEmployees } from '@/shared/lib/router/paths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { Flex, HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import ArrowLeft from '@/shared/assets/icons/arrow-left.svg';
import { EmployeeInfo } from '@/widgets/EmployeeInfo';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { TripsInfoByMonth } from '@/widgets/TripsInfoByMonth';
import { SortTripsByMonth, TripsFilter } from '@/features/sort-employee-trips';

const stack = getVStack({
  gap: 16,
});

const EmployeePage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <HStack justify="space-between">
        <HStack gap={16}>
          <AppLink variant="regular" to={getRouteEmployees()}>
            <ArrowLeft />
          </AppLink>
          <Text as="h1" weight="bold" size={{ base: 32, sm: 18 }}>
            Костин Герман Феликсович
          </Text>
        </HStack>

        <AppLink to="" variant="outline">
          Редактировать
        </AppLink>
      </HStack>
      <Flex
        direction={{ base: 'row', lg: 'column' }}
        justify="space-between"
        align="start"
        gap={16}
      >
        <Card width={770} p={0}>
          <EmployeeInfo />
        </Card>
        <Card width="full" p={0}>
          <VStack>
            <TripsInfoByMonth />
            <Text weight="bold" size={28}>
              Информация о поедках
            </Text>
            <SortTripsByMonth />
            <TripsFilter />
          </VStack>
        </Card>
      </Flex>
    </Card>
  );
};

export default EmployeePage;
