import { PushMessageData } from '@appjusto/types';
import * as Notifications from 'expo-notifications';
import { router, useRootNavigationState } from 'expo-router';
import { useEffect, useState } from 'react';
import { stopOrderRequestSound } from './sound';

export const useNotificationHandler = () => {
  // state
  // https://github.com/expo/router/issues/740
  const rootMounted = Boolean(useRootNavigationState()?.key);
  const [notification, setNotification] = useState<Notifications.Notification>();
  // side effects
  useEffect(() => {
    if (!notification) return;
    if (!rootMounted) return;
    console.log('useEffect', rootMounted, JSON.stringify(notification));
    const message = notification.request.content.data as PushMessageData;
    if (message.action === 'navigate') {
      router.push(message.url);
    } else if (message.action === 'order-request') {
      // router.push('/matching');
      router.push('/profile/howitworks/approval');
      stopOrderRequestSound().then(null).catch(console.error);
    }
  }, [notification, rootMounted]);
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
};
