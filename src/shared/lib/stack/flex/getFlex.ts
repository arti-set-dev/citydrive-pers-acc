import { FlexProps, GAP_VALUES, GapToken } from '@/shared/types/design-tokens';
import cls from './Flex.module.scss';

export function getFlex(options: Omit<FlexProps, 'children'> = {}) {
  const { direction, align, gap, justify } = options;

  const styles: React.CSSProperties & Record<string, any> = {};

  const setVars = (prefix: string, value: any, isToken = false) => {
    if (value === undefined || value === null) return;

    if (typeof value !== 'object') {
      const finalValue = isToken ? GAP_VALUES[value as GapToken] : value;
      styles[`--df-${prefix}`] = finalValue;
    } else {
      // Base (Desktop)
      styles[`--df-${prefix}`] = isToken
        ? GAP_VALUES[value.base as GapToken]
        : value.base;

      // Breakpoints
      if (value.lg !== undefined) {
        styles[`--df-${prefix}-lg`] = isToken
          ? GAP_VALUES[value.lg as GapToken]
          : value.lg;
      }
      if (value.md !== undefined) {
        styles[`--df-${prefix}-md`] = isToken
          ? GAP_VALUES[value.md as GapToken]
          : value.md;
      }
      if (value.sm !== undefined) {
        styles[`--df-${prefix}-sm`] = isToken
          ? GAP_VALUES[value.sm as GapToken]
          : value.sm;
      }
    }
  };

  setVars('dir', direction);
  setVars('align', align);
  setVars('justify', justify);
  setVars('gap', gap, true);

  return {
    className: cls.Flex,
    style: styles,
  };
}
