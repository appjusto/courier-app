import { PushMessageData } from '@appjusto/types';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { stopOrderRequestSound } from './sound';

export const useNotificationHandler = () => {
  // state
  const [notification, setNotification] = useState<Notifications.Notification>();
  // side effects
  useEffect(() => {
    if (!notification) return;
    const message = notification.request.content.data as PushMessageData;
    if (message.action === 'navigate') {
      //
    } else if (message.action === 'order-request') {
      stopOrderRequestSound().then(null).catch(console.error);
    }
  }, [notification]);
  // handle notifications
  useEffect(() => {
    let isMounted = true;
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      setNotification(response.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      setNotification(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return notification;
};
