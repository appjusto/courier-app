import { onSimulator } from '@/common/version/device';
import crashlytics from '@react-native-firebase/crashlytics';
import BackgroundGeolocation from 'react-native-background-geolocation';

export const startBackgroundGeolocation = async () => {
  try {
    if (onSimulator()) return;
    const state = await BackgroundGeolocation.getState();
    if (!state.enabled) {
      await BackgroundGeolocation.start();
    }
    const location = await BackgroundGeolocation.getCurrentPosition({
      samples: 1,
      persist: false,
    });
    return location;
  } catch (error: unknown) {
    if (error instanceof Error) crashlytics().recordError(error);
  }
};
