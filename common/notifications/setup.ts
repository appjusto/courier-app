import { Audio } from 'expo-av';
import * as Device from 'expo-device';
import { setupChannels } from './channels';
import { registerBackgroundNotificationTask } from './task';

export const setupNotifications = async () => {
  if (Device.isDevice) {
    try {
      await setupChannels();
    } catch (error: unknown) {
      console.error(error);
    }
    try {
      await Audio.setAudioModeAsync({ staysActiveInBackground: true });
    } catch (error: unknown) {
      console.error(error);
    }
    try {
      await registerBackgroundNotificationTask();
    } catch (error: unknown) {
      console.error(error);
    }
  }
};
