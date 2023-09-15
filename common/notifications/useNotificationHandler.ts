import { PushMessageData } from '@appjusto/types';
import * as Notifications from 'expo-notifications';
import { router, useRootNavigationState } from 'expo-router';
import { useEffect, useState } from 'react';
import { stopOrderRequestSound } from './sound';

export const useNotificationHandler = () => {
  // state
  // https://github.com/expo/router/issues/740
  const mounted = Boolean(useRootNavigationState()?.key);
  const [notification, setNotification] = useState<Notifications.Notification>();
  // side effects
  useEffect(() => {
    if (!mounted) return;
    if (!notification) return;
    const message = notification.request.content.data as PushMessageData;
    if (message.action === 'navigate') {
      // @ts-expect-error
      router.push(message.url);
    } else if (message.action === 'order-request') {
      // @ts-expect-error
      router.push(message.url);
      stopOrderRequestSound().then(null).catch(console.error);
    }
  }, [notification, mounted]);
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
