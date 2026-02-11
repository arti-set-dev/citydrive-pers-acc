import { getEmployeeData } from '@citydrive/entities/Employee';
import { NotificationButton } from '@citydrive/entities/Notification';
import { AddBalance } from '@/features/add-balance';
import { LogoutButton } from '@citydrive/auth';
import { useAppSelector } from '@citydrive/shared/hooks/useAppSelector/useAppSelector';
import { getHStack } from '@citydrive/shared/lib/stack/flex/getHStack';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { HStack } from '@citydrive/shared/ui/Stack';
import { memo } from 'react';

const stack = getHStack({
  justify: 'space-between',
});

export const Navbar = memo(function Navbar() {
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
});
