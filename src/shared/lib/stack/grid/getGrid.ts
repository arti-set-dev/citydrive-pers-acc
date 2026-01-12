import { GAP_VALUES, GapToken, GridProps } from '@/shared/types/design-tokens';
import cls from './Grid.module.scss';

export function getGrid(options: Omit<GridProps, 'children'> = {}) {
  const { cols, gap } = options;
  const styles: React.CSSProperties & Record<string, any> = {};

  const setVars = (prefix: string, value: any, isToken = false) => {
    if (!value) return;
    if (typeof value !== 'object') {
      styles[`--grid-${prefix}`] = isToken
        ? GAP_VALUES[value as GapToken]
        : value;
    } else {
      styles[`--grid-${prefix}`] = isToken
        ? GAP_VALUES[value.base as GapToken]
        : value.base;
      if (value.md)
        styles[`--grid-${prefix}-md`] = isToken
          ? GAP_VALUES[value.md as GapToken]
          : value.md;
    }
  };

  setVars('cols', cols);
  setVars('gap', gap, true);

  return {
    className: cls.Grid,
    style: styles,
  };
}
