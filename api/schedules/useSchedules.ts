import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export const useSchedules = () => {
  useEffect(() => {
    Notifications.cancelAllScheduledNotificationsAsync()
      .then(() => {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Vamos ficar disponível?',
            body: 'Clique!',
            data: {},
          },
          trigger: {
            hour: 10,
            minute: 0,
            repeats: true,
            channelId: 'profile-availability',
          },
        }).then(null);
      })
      .then(() => {});
  }, []);
};
