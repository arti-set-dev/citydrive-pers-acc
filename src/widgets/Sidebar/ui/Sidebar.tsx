import { PATHS } from '@citydrive/shared/lib/router/paths';
import { AppLink } from '@citydrive/shared/ui/AppLink/AppLink';
import { Flex, VStack } from '@citydrive/shared/ui/Stack';
import React, { memo, useMemo } from 'react';
import HouseIcon from '@citydrive/shared/assets/icons/house.svg';
import IdCardLanyardIcon from '@citydrive/shared/assets/icons/id-card-lanyard.svg';
import ClipboardListIcon from '@citydrive/shared/assets/icons/clipboard-list.svg';
import CarFrontIcon from '@citydrive/shared/assets/icons/car-front.svg';
import BellElectricIcon from '@citydrive/shared/assets/icons/bell-electric.svg';
import PercentIcon from '@citydrive/shared/assets/icons/percent.svg';
import SettingsIcon from '@citydrive/shared/assets/icons/settings.svg';
import styles from './Sidebar.module.scss';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { Logo } from '@citydrive/shared/ui/Logo/Logo';
import { getVStack } from '@citydrive/shared/lib/stack/flex/getVStack';
import clsx from 'clsx';
import MoreIcon from '@citydrive/shared/assets/icons/ellipsis-vertical.svg';
import { isMobile } from 'react-device-detect';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Button } from '@citydrive/shared/ui/Button/Button';
import { useAppSelector } from '@citydrive/shared/hooks/useAppSelector/useAppSelector';
import { getEmployeeData } from '@citydrive/entities/Employee';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

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

const userPaths: string[] = [
  PATHS.home,
  PATHS.trips,
  PATHS.invoices,
  PATHS.promocodes,
  PATHS.settings,
];

const stack = getVStack({
  gap: 16,
  justify: 'space-between',
});

export const Sidebar = memo(function Sidebar() {
  const role = useAppSelector((state) => getEmployeeData(state)?.role);
  const companyName = useAppSelector(
    (state) => getEmployeeData(state)?.companyName,
  );

  const { visibleRouts, hiddenRouts } = useMemo(() => {
    const filtered = routs.filter((route) => {
      if (role === 'admin') return true;
      return userPaths.includes(route.path);
    });

    return {
      visibleRouts: filtered.filter(
        (item) => !isMobile || item.mobileVisible !== false,
      ),
      hiddenRouts: isMobile
        ? routs.filter((item) => item.mobileVisible === false)
        : [],
    };
  }, [role]);

  return (
    <Card
      width={{ base: 280, lg: 'full' }}
      variant="bg-tertiary"
      as="aside"
      p={16}
      className={clsx(stack.className, styles.Sidebar, styles.Sidebar)}
      style={stack.style}
    >
      <VStack gap={16}>
        {!isMobile && (
          <Logo companyName={companyName} className={styles.Logo} />
        )}
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
      </VStack>
      <ThemeSwitcher />
    </Card>
  );
});
