import { getRouteDepartmentNew } from '@/shared/lib/router/paths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

const DepartmentPage = () => {
  return (
    <Card>
      <HStack>
        <Text as="h1" weight="bold">
          Отделы
        </Text>
        <AppLink to={getRouteDepartmentNew()} variant="outline">
          Добавить отдел
        </AppLink>
      </HStack>
    </Card>
  );
};

export default DepartmentPage;
