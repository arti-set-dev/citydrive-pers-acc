import {
  GAP_VALUES,
  GapToken,
  GridProps,
  Responsive,
} from '@/shared/types/design-tokens';
import styles from './Grid.module.scss';

export const Grid = ({ cols, gap, children }: GridProps) => {
  const getResponsiveVars = (
    prop: Responsive<any> | undefined,
    name: string,
    mapper?: (v: any) => string | number,
  ) => {
    if (!prop) return {};

    if (typeof prop !== 'object') {
      return { [`--${name}`]: mapper ? mapper(prop) : prop };
    }

    return {
      [`--${name}`]: mapper ? mapper(prop.base) : prop.base,
      [`--${name}-md`]:
        prop.md !== undefined
          ? mapper
            ? mapper(prop.md)
            : prop.md
          : undefined,
      [`--${name}-lg`]:
        prop.lg !== undefined
          ? mapper
            ? mapper(prop.lg)
            : prop.lg
          : undefined,
      [`--${name}-sm`]:
        prop.sm !== undefined
          ? mapper
            ? mapper(prop.sm)
            : prop.sm
          : undefined,
    };
  };

  const style = {
    ...getResponsiveVars(cols, 'grid-cols'),
    ...getResponsiveVars(gap, 'grid-gap', (v) => GAP_VALUES[v as GapToken]),
  } as React.CSSProperties;

  return (
    <div className={styles.Grid} style={style}>
      {children}
    </div>
  );
};
