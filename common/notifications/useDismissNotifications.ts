import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export const useDismissNotifications = () => {
  // side effects
  useEffect(() => {
    Notifications.dismissAllNotificationsAsync().catch(() => null);
  }, []);
};
