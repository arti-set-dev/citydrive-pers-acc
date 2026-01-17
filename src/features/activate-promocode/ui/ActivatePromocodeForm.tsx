import { getFlex } from '@/shared/lib/stack/flex/getFlex';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Field } from '@/shared/ui/Field/Field';

const stack = getFlex({
  gap: 16,
  align: 'stretch',
  direction: { base: 'row', sm: 'column' },
});

export const ActivatePromocodeForm = () => {
  return (
    <Card
      as="form"
      p={16}
      r={16}
      variant="bg-outline"
      className={stack.className}
      style={stack.style}
    >
      <Field value="" placeholder="Активировать прокод" />
      <Button offset={8}>Отправить</Button>
    </Card>
  );
};
