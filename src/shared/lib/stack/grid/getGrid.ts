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
      Object.entries(value).forEach(([bp, val]) => {
        const key =
          bp === 'base' ? `--grid-${prefix}` : `--grid-${prefix}-${bp}`;
        styles[key] = isToken ? GAP_VALUES[val as GapToken] : val;
      });
    }
  };

  setVars('cols', cols);
  setVars('gap', gap, true);

  return { className: cls.Grid, style: styles };
}
