import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import { Card } from '@/shared/ui/Card/Card';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { ComponentType, SVGProps } from 'react';

interface StatProps {
  subject: string;
  desc?: string;
  statMain: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

const stack = getVStack({
  gap: 16,
});

export const Stat = (props: StatProps) => {
  const { desc, icon: Icon, subject, statMain } = props;
  return (
    <Card shadow p={16} r={16} className={stack.className} style={stack.style}>
      <Text color="text-tertiary">{subject}</Text>
      <Text weight="medium" size={32}>
        {statMain}
      </Text>
      <HStack justify="space-between" align="end">
        <Text color="text-tertiary">{desc}</Text>
        {Icon && <Icon width={40} height={40} />}
      </HStack>
    </Card>
  );
};
