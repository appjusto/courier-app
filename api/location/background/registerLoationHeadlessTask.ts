import crashlytics from '@react-native-firebase/crashlytics';
import Constants from 'expo-constants';
import BackgroundGeolocation from 'react-native-background-geolocation';

if (Constants.appOwnership !== 'expo') {
  BackgroundGeolocation.registerHeadlessTask(async (event: any) => {
    try {
      console.log('[BackgroundGeolocation HeadlessTask] -', JSON.stringify(event));
      if (event.name === 'heartbeat') {
      }
    } catch (error: unknown) {
      if (error instanceof Error) crashlytics().recordError(error);
    }
  });
}
