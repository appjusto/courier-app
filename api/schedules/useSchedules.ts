import { Dayjs } from '@appjusto/dates';
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
            date: Dayjs()
              .add(Dayjs.duration({ seconds: 5 }))
              .toDate(),
            channelId: 'profile-availability',
          },
        }).then(null);
      })
      .then(() => {});
  }, []);
};
