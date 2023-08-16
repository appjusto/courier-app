import { NotificationChannel } from '@appjusto/types';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { playOrderRequestSound } from './sound';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
  console.log('task received');
  console.log(JSON.stringify(data));
  const { channelId } = (data as Payload).notification.data;
  console.log('channelId', channelId);
  if (channelId === 'order-request') {
    playOrderRequestSound().then(null).catch(console.error);
  }
});

export const registerBackgroundNotificationTask = async () => {
  await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
};

interface Payload {
  notification: {
    notification: object;
    data: {
      channelId: NotificationChannel;
      message: string;
      title: string;
      body: string;
    };
  };
}
