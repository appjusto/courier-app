import * as Device from 'expo-device';
import {
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
} from 'expo-notifications';

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
          resolve((await getExpoPushTokenAsync()).data);
        } else {
          reject(new Error(finalStatus));
        }
      } else {
        resolve(null);
      }
    } catch (error: unknown) {
      if (retries > 0) setTimeout(async () => resolve(await getExpoPushToken(retries - 1)), 1000);
      else {
        reject(error);
      }
    }
  });
};
