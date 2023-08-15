import { PushMessageData } from '@appjusto/types';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect } from 'react';

export const useNotificationHandler = () => {
  // side effects
  // handle notifications
  useEffect(() => {
    let isMounted = true;

    function handler(notification: Notifications.Notification, delay = 0) {
      const message = notification.request.content.data as PushMessageData;
      if (message.action === 'navigate') {
        setTimeout(() => {
          router.push(message.url);
        }, delay);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      // adding delay to workaround issue
      handler(response?.notification, 50);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      handler(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
};
