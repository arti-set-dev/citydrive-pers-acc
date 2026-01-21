import React, {
  ElementType,
  ReactNode,
  ComponentPropsWithoutRef,
  CSSProperties,
} from 'react';
import cl from 'clsx';
import s from './Text.module.scss';

type FontSize = 10 | 12 | 13 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 40;
type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type LineHeight = 'xs' | 'sm' | 'md' | 'lg';
type TextColor =
  | 'text-primary'
  | 'text-secondary'
  | 'text-tertiary'
  | 'text-inverse'
  | 'brand'
  | 'success'
  | 'danger'
  | 'warning';

export type Responsive<T> = T | { base: T; sm?: T; md?: T; lg?: T };

interface TextCustomProps {
  size?: Responsive<FontSize>;
  weight?: Responsive<FontWeight>;
  height?: Responsive<LineHeight>;
  color?: TextColor;
  leader?: boolean;
  align?: Responsive<TextAlign>;
  children: ReactNode;
}

type Props<T extends ElementType> = { as?: T } & TextCustomProps &
  Omit<ComponentPropsWithoutRef<T>, keyof TextCustomProps | 'as'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapToken = (prop: string, value: any) => {
  if (!value) return undefined;
  switch (prop) {
    case 'size':
      return `var(--font-size-${value})`;
    case 'weight':
      return `var(--font-weight-${value})`;
    case 'height':
      return `var(--line-height-${value})`;
    case 'color':
      return `var(--${value})`;
    case 'align':
      return value;
    default:
      return value;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getResponsiveVars = (prop: string, value?: Responsive<any>) => {
  if (!value) return {};
  if (typeof value !== 'object') {
    return { [`--txt-${prop}`]: mapToken(prop, value) };
  }
  return {
    [`--txt-${prop}`]: mapToken(prop, value.base),
    [`--txt-${prop}-sm`]: mapToken(prop, value.sm),
    [`--txt-${prop}-md`]: mapToken(prop, value.md),
    [`--txt-${prop}-lg`]: mapToken(prop, value.lg),
  };
};

export const Text = <T extends ElementType = 'div'>({
  as,
  children,
  size,
  weight,
  height,
  color,
  className,
  leader = false,
  align,
  style,
  ...restProps
}: Props<T>) => {
  const Component = as || 'div';

  const responsiveStyles = {
    ...getResponsiveVars('size', size),
    ...getResponsiveVars('weight', weight),
    ...getResponsiveVars('height', height),
    ...getResponsiveVars('align', align),
    '--txt-color': mapToken('color', color),
  } as CSSProperties;

  return (
    <Component
      className={cl(s.Text, { [s.leader]: leader }, className)}
      style={{ ...responsiveStyles, ...style }}
      {...restProps}
    >
      {children}
    </Component>
  );
};
