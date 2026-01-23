import { GAP_VALUES, GapToken, Responsive } from '@/shared/types/design-tokens';
import React, { ElementType, ComponentPropsWithoutRef, RefObject } from 'react';
import styles from './Flex.module.scss';
import clsx from 'clsx';

type PolymorphicFlexProps<T extends ElementType> = {
  as?: T;
  gap?: Responsive<GapToken>;
  direction?: Responsive<'row' | 'column' | 'row-reverse'>;
  align?: Responsive<'start' | 'center' | 'end' | 'stretch'>;
  children?: React.ReactNode;
  justify?: Responsive<'center' | 'space-between' | 'end' | 'start'>;
  className?: string;
  ref?: RefObject<HTMLDivElement | null>;
} & (T extends 'ul' | 'ol'
  ? {
      p?: Responsive<GapToken>;
      m?: Responsive<GapToken>;
    }
  : object);

type FlexComponentProps<T extends ElementType> = PolymorphicFlexProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PolymorphicFlexProps<T>>;

export const Flex = <T extends ElementType = 'div'>({
  as,
  gap,
  direction,
  align,
  children,
  justify = 'start',
  className,
  ref,
  ...restProps
}: FlexComponentProps<T>) => {
  const getSafeValue = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prop: Responsive<any> | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapper?: (v: any) => string,
  ) => {
    if (prop === undefined) return null;

    if (typeof prop !== 'object') {
      return mapper ? mapper(prop) : prop;
    }

    // Добавлена поддержка lg и sm
    return {
      base: mapper ? mapper(prop.base) : prop.base,
      lg:
        prop.lg !== undefined
          ? mapper
            ? mapper(prop.lg)
            : prop.lg
          : undefined,
      md:
        prop.md !== undefined
          ? mapper
            ? mapper(prop.md)
            : prop.md
          : undefined,
      sm:
        prop.sm !== undefined
          ? mapper
            ? mapper(prop.sm)
            : prop.sm
          : undefined,
    };
  };

  const gapVal = getSafeValue(gap, (v) => GAP_VALUES[v as GapToken]);
  const dirVal = getSafeValue(direction);
  const alignVal = getSafeValue(align);
  const justifyVal = getSafeValue(justify);

  const Component = as || 'div';
  const isListElement = Component === 'ul' || Component === 'ol';

  const paddingVal = isListElement
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getSafeValue((restProps as any).p, (v) => GAP_VALUES[v as GapToken])
    : null;
  const marginVal = isListElement
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getSafeValue((restProps as any).m, (v) => GAP_VALUES[v as GapToken])
    : null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const style: React.CSSProperties & Record<string, any> = {
    // Gap
    '--df-gap': typeof gapVal === 'object' ? gapVal?.base : gapVal,
    '--df-gap-lg': typeof gapVal === 'object' ? gapVal?.lg : undefined,
    '--df-gap-md': typeof gapVal === 'object' ? gapVal?.md : undefined,
    '--df-gap-sm': typeof gapVal === 'object' ? gapVal?.sm : undefined,

    // Direction
    '--df-dir': typeof dirVal === 'object' ? dirVal?.base : dirVal,
    '--df-dir-lg': typeof dirVal === 'object' ? dirVal?.lg : undefined,
    '--df-dir-md': typeof dirVal === 'object' ? dirVal?.md : undefined,
    '--df-dir-sm': typeof dirVal === 'object' ? dirVal?.sm : undefined,

    // Align
    '--df-align': typeof alignVal === 'object' ? alignVal?.base : alignVal,
    '--df-align-lg': typeof alignVal === 'object' ? alignVal?.lg : undefined,
    '--df-align-md': typeof alignVal === 'object' ? alignVal?.md : undefined,
    '--df-align-sm': typeof alignVal === 'object' ? alignVal?.sm : undefined,

    // Justify
    '--df-justify':
      typeof justifyVal === 'object' ? justifyVal?.base : justifyVal,
    '--df-justify-lg':
      typeof justifyVal === 'object' ? justifyVal?.lg : undefined,
    '--df-justify-md':
      typeof justifyVal === 'object' ? justifyVal?.md : undefined,
    '--df-justify-sm':
      typeof justifyVal === 'object' ? justifyVal?.sm : undefined,

    // Padding & Margin (только для списков)
    '--df-padding': isListElement
      ? ((typeof paddingVal === 'object' ? paddingVal?.base : paddingVal) ??
        '0px')
      : undefined,
    '--df-padding-lg':
      isListElement && typeof paddingVal === 'object'
        ? paddingVal?.lg
        : undefined,
    '--df-padding-md':
      isListElement && typeof paddingVal === 'object'
        ? paddingVal?.md
        : undefined,
    '--df-padding-sm':
      isListElement && typeof paddingVal === 'object'
        ? paddingVal?.sm
        : undefined,

    '--df-margin': isListElement
      ? ((typeof marginVal === 'object' ? marginVal?.base : marginVal) ?? '0px')
      : undefined,
    '--df-margin-lg':
      isListElement && typeof marginVal === 'object'
        ? marginVal?.lg
        : undefined,
    '--df-margin-md':
      isListElement && typeof marginVal === 'object'
        ? marginVal?.md
        : undefined,
    '--df-margin-sm':
      isListElement && typeof marginVal === 'object'
        ? marginVal?.sm
        : undefined,
  };

  return (
    <Component
      ref={ref}
      className={clsx(styles.Flex, className)}
      style={style}
      {...restProps}
    >
      {children}
    </Component>
  );
};
