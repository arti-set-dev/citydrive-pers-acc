import { FlexProps, GapToken, Responsive } from '@/shared/types/design-tokens';
import { Flex } from './Flex';
import { ElementType, ComponentPropsWithoutRef, RefObject } from 'react';

type VStackProps<T extends ElementType = 'div'> = Omit<
  {
    as?: T;
    gap?: FlexProps['gap'];
    align?: FlexProps['align'];
    children?: React.ReactNode;
    ref?: RefObject<HTMLDivElement | null>;
    className?: string;
  } & (T extends 'ul' | 'ol'
    ? {
        listStyle?: React.CSSProperties['listStyle'];
        p?: Responsive<GapToken>;
        m?: Responsive<GapToken>;
      }
    : {}),
  'direction'
> &
  Omit<
    ComponentPropsWithoutRef<T>,
    'gap' | 'align' | 'as' | 'children' | 'listStyle' | 'p' | 'm' | 'direction'
  >;

export const VStack = <T extends ElementType = 'div'>(
  props: VStackProps<T>,
) => (
  <Flex
    {...(props as any)}
    direction="column"
    align={props.align ?? 'stretch'}
  />
);
