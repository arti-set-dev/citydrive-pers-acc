import { FlexProps } from '@/shared/types/design-tokens';
import { getFlex } from './getFlex';

export function getHStack(options: Omit<FlexProps, 'direction'> = {}) {
  return getFlex({
    ...options,
    direction: 'row',
    align: options.align ?? 'center',
    justify: options.justify ?? 'start',
  });
}
