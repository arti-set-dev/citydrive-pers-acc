import { Card } from '@/shared/ui/Card/Card';
import { Flex, Grid } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Department } from '../../model/types/department';

interface DepartmentItemProps {
  department: Department;
  actions?: React.ReactNode;
}

export const DepartmentItem = ({
  department,
  actions,
}: DepartmentItemProps) => {
  return (
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
  );
};
