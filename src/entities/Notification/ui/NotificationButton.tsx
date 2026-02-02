import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import NotificationIcon from '@/shared/assets/icons/bell.svg';
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from '../api/notificationApi';
import styles from './NotificationButton.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteEmployee } from '@/shared/lib/router/paths';
import { Text } from '@/shared/ui/Text/Text';
import { useEffect } from 'react';
import { Button } from '@/shared/ui/Button/Button';

export const NotificationButton = () => {
  const { data: notifications = [] } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const unreadNotifications = notifications.filter((n) => !n.read);
  const unreadCount = unreadNotifications.length;

  const handleOpen = (open: boolean) => {
    if (open && unreadCount > 0) {
      unreadNotifications.forEach((n) => {
        markAsRead(n.id);
      });
    }
  };

  return (
    <Popover className={styles.wrapper}>
      {({ open }) => {
        useEffect(() => {
          handleOpen(open);
        }, [open]);

        return (
          <>
            <PopoverButton as={Button} variant="clear" className={styles.btn}>
              <NotificationIcon />
              {unreadCount > 0 && (
                <span className={styles.badge}>{unreadCount}</span>
              )}
            </PopoverButton>

            <PopoverPanel anchor="bottom end" className={styles.panel}>
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div key={n.id} className={styles.item}>
                    <Text size={14}>{n.message}</Text>
                    <AppLink to={getRouteEmployee(n.employeeId)}>
                      Профиль
                    </AppLink>
                  </div>
                ))
              ) : (
                <Text>Уведомлений нет</Text>
              )}
            </PopoverPanel>
          </>
        );
      }}
    </Popover>
  );
};
