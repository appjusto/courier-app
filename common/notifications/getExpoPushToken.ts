import { getManifestExtra } from '@/extra';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Device from 'expo-device';
import {
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
} from 'expo-notifications';
import { ShowToast } from '../components/toast/Toast';

const extra = getManifestExtra();

export const getExpoPushToken = (retries: number): Promise<string | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Device.isDevice) {
        const { status: existingStatus } = await getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus === 'granted') {
          resolve((await getExpoPushTokenAsync({ projectId: extra.eas.projectId })).data);
        } else {
          reject(new Error(finalStatus));
        }
      } else {
        resolve(null);
      }
    } catch (error: unknown) {
      if (retries > 0) setTimeout(async () => resolve(await getExpoPushToken(retries - 1)), 1000);
      else {
        ShowToast('et:' + (error instanceof Error ? error.message : JSON.stringify(error)));
        if (error instanceof Error) crashlytics().recordError(error);
        reject(error);
      }
    }
  });
};
