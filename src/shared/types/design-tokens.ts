import React from 'react';

export const GAP_VALUES = {
  0: '0px',
  4: '4px',
  8: '8px',
  16: '16px',
  24: '24px',
  32: '32px',
} as const;

export type GapToken = keyof typeof GAP_VALUES; // 0 | 4 | 8 | 16 | 24 | 32
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexDirection = 'row' | 'column';
export type FlexJustify = 'space-between' | 'center' | 'end' | 'start';

export type Responsive<T> =
  | T
  | {
      base: T;
      sm?: T;
      md?: T;
      lg?: T;
    };

export interface FlexProps {
  gap?: Responsive<GapToken>;
  direction?: Responsive<FlexDirection>;
  align?: Responsive<FlexAlign>;
  children?: React.ReactNode;
  justify?: Responsive<FlexJustify>;
}

export const GRID_COLUMNS = [1, 2, 3, 4, 5, 6, 12] as const;
export type GridColsToken = (typeof GRID_COLUMNS)[number];

export interface GridProps {
  cols?: Responsive<GridColsToken>;
  gap?: Responsive<GapToken>;
  children?: React.ReactNode;
}
