import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import NotificationIcon from '@citydrive/shared/assets/icons/bell.svg';
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from '../api/notificationApi';
import styles from './NotificationButton.module.scss';
import { AppLink } from '@citydrive/shared/ui/AppLink/AppLink';
import { getRouteEmployee } from '@citydrive/shared/lib/router/paths';
import { Text } from '@citydrive/shared/ui/Text/Text';
import { useEffect } from 'react';
import { Button } from '@citydrive/shared/ui/Button/Button';
import { Notification } from '../model/types/notification';

interface NotificationContentProps {
  open: boolean;
  unreadNotifications: Notification[];
  markAsRead: (id: string) => void;
}

export const NotificationButton = () => {
  const { data: notifications = [] } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const unreadNotifications = notifications.filter((n) => !n.read);
  const unreadCount = unreadNotifications.length;

  const NotificationContent = ({
    open,
    unreadNotifications,
    markAsRead,
  }: NotificationContentProps) => {
    useEffect(() => {
      if (open && unreadNotifications.length > 0) {
        unreadNotifications.forEach((n) => {
          markAsRead(n.id);
        });
      }
    }, [open, unreadNotifications, markAsRead]);

    return null;
  };

  return (
    <Popover className={styles.wrapper}>
      {({ open }) => {
        <NotificationContent
          open={open}
          unreadNotifications={unreadNotifications}
          markAsRead={markAsRead}
        />;

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
