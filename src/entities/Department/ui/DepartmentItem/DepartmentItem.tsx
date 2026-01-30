import { Card } from '@/shared/ui/Card/Card';
import { Flex, Grid } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Department } from '../../model/types/department';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteDepartment } from '@/shared/lib/router/paths';

interface DepartmentItemProps {
  department: Department;
  actions?: React.ReactNode;
}

export const DepartmentItem = ({
  department,
  actions,
}: DepartmentItemProps) => {
  return (
    <AppLink to={getRouteDepartment(department.id)} variant="regular">
      <Grid cols={5}>
        <Card p={16} borderLine="bottom">
          <Text weight="medium" size={18}>
            {department.name}
          </Text>
        </Card>
        <Card p={16} borderLine="bottom">
          <Text color="text-tertiary">
            {department.employeesIds && department.employeesIds.length}
          </Text>
        </Card>
        <Card p={16} borderLine="bottom">
          <Text>{department.limit}</Text>
        </Card>
        <Card p={16} borderLine="bottom">
          <Text>{department.spent}</Text>
        </Card>
        <Card p={16} borderLine="bottom">
          <Flex align="end">{actions && actions}</Flex>
        </Card>
      </Grid>
    </AppLink>
  );
};
