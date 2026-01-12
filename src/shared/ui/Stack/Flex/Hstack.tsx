import { FlexProps, GapToken, Responsive } from '@/shared/types/design-tokens';
import { Flex } from './Flex';
import { ElementType, ComponentPropsWithoutRef, RefObject } from 'react';

type HStackProps<T extends ElementType = 'div'> = Omit<
  {
    as?: T;
    gap?: FlexProps['gap'];
    align?: FlexProps['align'];
    justify?: FlexProps['justify'];
    children?: React.ReactNode;
    ref?: RefObject<HTMLDivElement | null>;
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

export const HStack = <T extends ElementType = 'div'>(
  props: HStackProps<T>,
) => (
  <Flex {...(props as any)} direction="row" align={props.align ?? 'center'} />
);
