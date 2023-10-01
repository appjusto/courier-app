import { NotificationChannel, OrderMatchPushMessageData } from '@appjusto/types';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { ShowToast } from '../components/toast/Toast';
import { getDomain } from '../constants/urls';
import { playOrderRequestSound } from './sound';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
  console.log('task received');
  console.log(JSON.stringify(data));
  const { channelId, body } = (data as Payload).notification.data;
  console.log('channelId', channelId);
  if (channelId === 'order-request') {
    playOrderRequestSound()
      .then(null)
      .catch((error) => ShowToast(JSON.stringify(error)));
    try {
      const { url } = JSON.parse(body) as OrderMatchPushMessageData;
      const link = `https://${getDomain()}${url}`;
      Linking.openURL(link)
        .then(() => null)
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
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
