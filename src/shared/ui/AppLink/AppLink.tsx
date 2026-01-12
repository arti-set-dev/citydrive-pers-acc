import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AppLink.module.scss';

type AppLinkVariant = 'brand';

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
        clsx(className, styles[variant], { [activeClassName]: isActive })
      }
      to={to}
      {...other}
    >
      {children}
    </NavLink>
  );
};
