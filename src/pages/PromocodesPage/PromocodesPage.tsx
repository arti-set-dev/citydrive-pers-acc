import { ActivatePromocodeForm } from '@/features/activate-promocode';
import { getVStack } from '@citydrive/shared/lib/stack/flex/getVStack';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { Text } from '@citydrive/shared/ui/Text/Text';

const stack = getVStack({
  gap: 16,
});

const PromocodesPage = () => {
  return (
    <Card p={16} className={stack.className} style={stack.style}>
      <Text as="h1" weight="bold" size={32}>
        Промокоды
      </Text>
      <ActivatePromocodeForm />
    </Card>
  );
};

export default PromocodesPage;
