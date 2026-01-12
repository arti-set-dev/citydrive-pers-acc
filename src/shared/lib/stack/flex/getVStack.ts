import { FlexProps } from '@/shared/types/design-tokens';
import { getFlex } from './getFlex';

export function getVStack(options: Omit<FlexProps, 'direction'> = {}) {
  return getFlex({
    ...options,
    direction: 'column',
    align: options.align ?? 'stretch',
  });
}
