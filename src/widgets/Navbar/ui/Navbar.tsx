import { getEmployeeData } from '@/entities/Employee';
import { NotificationButton } from '@/entities/Notification';
import { AddBalance } from '@/features/add-balance';
import { LogoutButton } from '@/features/login';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { getHStack } from '@/shared/lib/stack/flex/getHStack';
import { Card } from '@/shared/ui/Card/Card';
import { HStack } from '@/shared/ui/Stack';

const stack = getHStack({
  justify: 'space-between',
});

export const Navbar = () => {
  const employeeData = useAppSelector(getEmployeeData);
  return (
    <Card
      variant="bg-tertiary"
      as="header"
      p={16}
      className={stack.className}
      style={stack.style}
    >
      <AddBalance id={employeeData?.id} />
      <HStack gap={4}>
        <NotificationButton />
        <LogoutButton />
      </HStack>
    </Card>
  );
};
