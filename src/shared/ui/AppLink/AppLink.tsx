import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AppLink.module.scss';

type AppLinkVariant = 'brand' | 'outline' | 'regular';

interface AppLinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  activeClassName?: string;
  variant?: AppLinkVariant;
}

export const AppLink = (props: AppLinkProps) => {
  const {
    children,
    to,
    className,
    activeClassName = 'active',
    variant = 'brand',
    ...other
  } = props;

  return (
    <NavLink
      className={({ isActive }) =>
        clsx(styles.AppLink, styles[variant], className, {
          [activeClassName]: isActive,
        })
      }
      to={to}
      {...other}
    >
      {children}
    </NavLink>
  );
};
