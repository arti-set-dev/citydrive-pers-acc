import { PATHS } from '@/shared/lib/router/paths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Flex } from '@/shared/ui/Stack';
import React from 'react';
import HouseIcon from '@/shared/assets/icons/house.svg';
import IdCardLanyardIcon from '@/shared/assets/icons/id-card-lanyard.svg';
import ClipboardListIcon from '@/shared/assets/icons/clipboard-list.svg';
import CarFrontIcon from '@/shared/assets/icons/car-front.svg';
import BellElectricIcon from '@/shared/assets/icons/bell-electric.svg';
import PercentIcon from '@/shared/assets/icons/percent.svg';
import SettingsIcon from '@/shared/assets/icons/settings.svg';
import styles from './Sidebar.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { Logo } from '@/shared/ui/Logo/Logo';
import { getVStack } from '@/shared/lib/stack/flex/getVStack';
import clsx from 'clsx';
import MoreIcon from '@/shared/assets/icons/ellipsis-vertical.svg';
import { isMobile } from 'react-device-detect';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Button } from '@/shared/ui/Button/Button';

interface SidebarItemOptions {
  path: string;
  name: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  mobileVisible?: boolean;
}

const routs: SidebarItemOptions[] = [
  {
    path: PATHS.home,
    name: 'Главная',
    icon: HouseIcon,
  },
  {
    path: PATHS.employees,
    name: 'Сотрудники',
    icon: IdCardLanyardIcon,
  },
  {
    path: PATHS.departments,
    name: 'Отделы',
    icon: ClipboardListIcon,
  },
  {
    path: PATHS.trips,
    name: 'Поездки',
    icon: CarFrontIcon,
  },
  {
    path: PATHS.invoices,
    name: 'Счета',
    icon: BellElectricIcon,
    mobileVisible: false,
  },
  {
    path: PATHS.promocodes,
    name: 'Промокоды',
    icon: PercentIcon,
    mobileVisible: false,
  },
  {
    path: PATHS.settings,
    name: 'Настройки',
    icon: SettingsIcon,
    mobileVisible: false,
  },
];

const stack = getVStack({
  gap: 16,
});

const visibleRouts = routs.filter(
  (item) => !isMobile || item.mobileVisible !== false,
);

const hiddenRouts = isMobile
  ? routs.filter((item) => item.mobileVisible === false)
  : [];

export const Sidebar = () => {
  return (
    <Card
      width={{ base: 280, lg: 'full' }}
      variant="bg-tertiary"
      as="aside"
      p={16}
      className={clsx(stack.className, styles.Sidebar, styles.Sidebar)}
      style={stack.style}
    >
      {!isMobile && <Logo className={styles.Logo} />}
      <Flex
        as="ul"
        gap={4}
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
      >
        {visibleRouts.map((item) => (
          <li key={item.path} className={styles.ListItem}>
            <AppLink
              className={styles.SidebarLink}
              activeClassName={styles.SidebarLinkActive}
              to={item.path}
            >
              {item.icon && <item.icon />}
              <span className={styles.LinkName}>{item.name}</span>
            </AppLink>
          </li>
        ))}

        {isMobile && hiddenRouts.length > 0 && (
          <li>
            <Popover className="relative">
              <PopoverButton as={Button} className={styles.SidebarLink}>
                <MoreIcon />
                <span>Еще</span>
              </PopoverButton>

              <PopoverPanel
                anchor="top end"
                className={clsx(styles.PopoverPanel)}
              >
                {hiddenRouts.map((item) => (
                  <AppLink
                    key={item.path}
                    to={item.path}
                    className={styles.SidebarLink}
                  >
                    {item.icon && <item.icon />}
                    {item.name}
                  </AppLink>
                ))}
              </PopoverPanel>
            </Popover>
          </li>
        )}
      </Flex>
    </Card>
  );
};
