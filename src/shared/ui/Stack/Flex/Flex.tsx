import { GAP_VALUES, GapToken, Responsive } from '@/shared/types/design-tokens';
import React, { ElementType, ComponentPropsWithoutRef, RefObject } from 'react';
import styles from './Flex.module.scss';
import clsx from 'clsx';

type PolymorphicFlexProps<T extends ElementType> = {
  as?: T;
  gap?: Responsive<GapToken>;
  direction?: Responsive<'row' | 'column'>;
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
    prop: Responsive<any> | undefined,
    mapper?: (v: any) => string,
  ) => {
    if (prop === undefined) return null;

    if (typeof prop !== 'object') {
      return mapper ? mapper(prop) : prop;
    }

    return {
      base: mapper ? mapper(prop.base) : prop.base,
      sm:
        prop.sm !== undefined
          ? mapper
            ? mapper(prop.sm)
            : prop.sm
          : undefined,

      md:
        prop.md !== undefined
          ? mapper
            ? mapper(prop.md)
            : prop.md
          : undefined,
    };
  };

  const gapVal = getSafeValue(gap, (v) => GAP_VALUES[v as GapToken]);
  const dirVal = getSafeValue(direction);
  const alignVal = getSafeValue(align);
  const justifyVal = getSafeValue(justify);

  const Component = as || 'div';
  const isListElement = Component === 'ul' || Component === 'ol';

  // Маппинг для p и m, если они переданы
  const paddingVal = isListElement
    ? getSafeValue((restProps as any).p, (v) => GAP_VALUES[v as GapToken])
    : null;
  const marginVal = isListElement
    ? getSafeValue((restProps as any).m, (v) => GAP_VALUES[v as GapToken])
    : null;

  const style: React.CSSProperties & Record<string, any> = {
    '--df-gap': typeof gapVal === 'object' ? gapVal?.base : gapVal,
    '--df-gap-md': typeof gapVal === 'object' ? gapVal?.md : undefined,
    '--df-dir': typeof dirVal === 'object' ? dirVal?.base : dirVal,
    '--df-dir-md': typeof dirVal === 'object' ? dirVal?.md : undefined,
    '--df-dir-sm': typeof dirVal === 'object' ? dirVal?.sm : undefined,
    '--df-align': typeof alignVal === 'object' ? alignVal?.base : alignVal,
    '--df-align-md': typeof alignVal === 'object' ? alignVal?.md : undefined,
    '--df-justify':
      typeof justifyVal === 'object' ? justifyVal?.base : justifyVal,
    '--df-justify-md':
      typeof justifyVal === 'object' ? justifyVal?.md : undefined,
    // CSS переменные для padding и margin
    '--df-padding': isListElement
      ? typeof paddingVal === 'object'
        ? (paddingVal?.base ?? '0px')
        : (paddingVal ?? '0px')
      : undefined,
    '--df-padding-md':
      isListElement &&
      paddingVal &&
      typeof paddingVal === 'object' &&
      paddingVal.md !== undefined
        ? paddingVal.md
        : undefined,
    '--df-margin': isListElement
      ? typeof marginVal === 'object'
        ? (marginVal?.base ?? '0px')
        : (marginVal ?? '0px')
      : undefined,
    '--df-margin-md':
      isListElement &&
      marginVal &&
      typeof marginVal === 'object' &&
      marginVal.md !== undefined
        ? marginVal.md
        : undefined,
  };

  return (
    <Component ref={ref} className={clsx(styles.Flex, className)} style={style}>
      {children}
    </Component>
  );
};
