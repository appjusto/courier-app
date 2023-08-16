import { setupChannels } from './channels';
import { registerBackgroundNotificationTask } from './task';

export const setupNotifications = async () => {
  try {
    await setupChannels();
  } catch (error: unknown) {
    console.error(error);
  }
  try {
    await registerBackgroundNotificationTask();
  } catch (error: unknown) {
    console.error(error);
  }
};
