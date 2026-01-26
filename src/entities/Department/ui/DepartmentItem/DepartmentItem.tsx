import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { ActionPopover } from '@/shared/ui/Popover/Popover';
import { Flex, Grid } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Department } from '../../model/types/department';

interface DepartmentItemProps {
  department: Department;
}

export const DepartmentItem = ({ department }: DepartmentItemProps) => {
  return (
    <Grid cols={5}>
      <Card p={16} borderLine="bottom">
        <Text weight="medium" size={18}>
          {department.name}
        </Text>
      </Card>
      <Card p={16} borderLine="bottom">
        <Text color="text-tertiary">{department.employeesIds.length}</Text>
      </Card>
      <Card p={16} borderLine="bottom">
        <Text>{department.limit}</Text>
      </Card>
      <Card p={16} borderLine="bottom">
        <Text>{department.spent}</Text>
      </Card>
      <Card p={16} borderLine="bottom">
        <Flex align="end">
          <ActionPopover>
            <Button variant="clear">Edit</Button>
            <Button variant="clear">Delete</Button>
          </ActionPopover>
        </Flex>
      </Card>
    </Grid>
  );
};
