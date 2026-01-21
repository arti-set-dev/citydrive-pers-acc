import React, { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import { GAP_VALUES, GapToken, Responsive } from '@/shared/types/design-tokens';
import styles from './Card.module.scss';
import clsx from 'clsx';

type CardVariant = 'bg-primary' | 'bg-secondary' | 'bg-tertiary' | 'bg-outline';
type BorderLine = 'left' | 'right' | 'top' | 'bottom' | 'none';
type BorderRadius = 0 | 4 | 8 | 16 | 24 | 32;
type WidthToken =
  | 0
  | 24
  | 32
  | 40
  | 48
  | 64
  | 80
  | 120
  | 160
  | 200
  | 240
  | 280
  | 540
  | 770
  | 830
  | 'auto'
  | 'full';

type CardElement =
  | 'aside'
  | 'main'
  | 'article'
  | 'header'
  | 'form'
  | 'ul'
  | 'li';

interface CardProps<T extends ElementType = 'div'> {
  as?: T extends CardElement ? T : CardElement;
  variant?: CardVariant;
  p?: Responsive<GapToken>;
  r?: Responsive<BorderRadius>;
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  width?: Responsive<WidthToken>;
  shadow?: boolean;
  borderLine?: BorderLine;
  isOverflowAuto?: boolean;
  minWidth?: Responsive<WidthToken>;
  style?: React.CSSProperties;
}

type PolymorphicCardProps<T extends ElementType> = CardProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>;

const getResponsiveVars = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prop: Responsive<any> | undefined,
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapper?: (v: any) => string | number,
) => {
  if (prop === undefined || prop === null) return {};

  if (typeof prop !== 'object') {
    return { [`--${name}`]: mapper ? mapper(prop) : prop };
  }

  const vars: Record<string, string | number> = {
    [`--${name}`]: mapper ? mapper(prop.base) : prop.base,
  };

  if (prop.lg !== undefined) {
    vars[`--${name}-lg`] = mapper ? mapper(prop.lg) : prop.lg;
  }
  if (prop.md !== undefined) {
    vars[`--${name}-md`] = mapper ? mapper(prop.md) : prop.md;
  }
  if (prop.sm !== undefined) {
    vars[`--${name}-sm`] = mapper ? mapper(prop.sm) : prop.sm;
  }

  return vars;
};

export const Card = <T extends ElementType = 'div'>({
  as,
  variant = 'bg-primary',
  p,
  r = 0,
  children,
  className,
  style,
  fullWidth = false,
  width = 'auto',
  shadow = false,
  borderLine = 'none',
  isOverflowAuto = false,
  minWidth = 'auto',
  ...restProps
}: PolymorphicCardProps<T>) => {
  const Component = (as || 'div') as ElementType;

  const cssVars = getResponsiveVars(p, 'card-padding', (v) => {
    const key = v as keyof typeof GAP_VALUES;
    return GAP_VALUES[key];
  });
  const radiusVars = getResponsiveVars(
    r,
    'card-radius',
    (v) => `var(--radius-${v})`,
  );
  const widthStyle =
    width !== undefined ? { '--card-width': `var(--width-${width})` } : {};

  const widthVars = getResponsiveVars(width, 'card-max-width', (v) =>
    v === 'auto' ? 'auto' : `var(--width-${v})`,
  );

  const minWidthVars = getResponsiveVars(minWidth, 'card-min-width', (v) =>
    v === 'auto' ? 'auto' : `var(--width-${v})`,
  );

  const borderClassesMap: Record<BorderLine, string> = {
    left: styles.borderLeft,
    right: styles.borderRight,
    top: styles.borderTop,
    bottom: styles.borderBottom,
    none: '',
  };
  return (
    <Component
      className={clsx(
        styles.Card,
        styles[variant],
        borderClassesMap[borderLine],
        { [styles.fullWidth]: fullWidth },
        { [styles.overflowAuto]: isOverflowAuto },
        { [styles.shadow]: shadow },
        className,
      )}
      style={{
        ...cssVars,
        ...radiusVars,
        ...widthVars,
        ...widthStyle,
        ...minWidthVars,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </Component>
  );
};
