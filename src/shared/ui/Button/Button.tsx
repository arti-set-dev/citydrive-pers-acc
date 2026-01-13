import React, { ComponentType, SVGProps } from 'react';
import clsx from 'clsx';
import s from './Button.module.scss';
import { HStack } from '../Stack';

type ButtonOffset = 0 | 4 | 8 | '';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'clear'
    | 'clear-brand'
    | 'close'
    | 'outline'
    | 'as-field';
  offset?: ButtonOffset;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  offset = '',
  icon: Icon,
  ...props
}) => {
  const offsetClassesMap: Record<Exclude<ButtonOffset, ''>, string> = {
    0: s.offset0,
    4: s.offset4,
    8: s.offset8,
  };
  if (Icon) {
    return (
      <HStack gap={4}>
        <button
          className={clsx(
            s.button,
            s.offset,
            s[variant],
            offset && offsetClassesMap[offset],
            className,
          )}
          {...props}
        >
          {children}
        </button>
        <Icon />
      </HStack>
    );
  }
  return (
    <button
      className={clsx(
        s.button,
        s.offset,
        s[variant],
        offset && offsetClassesMap[offset],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
