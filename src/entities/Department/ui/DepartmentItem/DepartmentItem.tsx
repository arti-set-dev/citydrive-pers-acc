import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { ActionPopover } from '@/shared/ui/Popover/Popover';
import { Flex, Grid } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

export const DepartmentItem = () => {
  return (
    <Grid cols={5}>
      <Card p={16} borderLine="bottom">
        <Text weight="medium" size={18}>
          Отдел продаж
        </Text>
      </Card>
      <Card p={16} borderLine="bottom">
        <Text color="text-tertiary">8</Text>
      </Card>
      <Card p={16} borderLine="bottom">
        <Text>500 000 р/мес</Text>
      </Card>
      <Card p={16} borderLine="bottom">
        <Text>9 500 р</Text>
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
