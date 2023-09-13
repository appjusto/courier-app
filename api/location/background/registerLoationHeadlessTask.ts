import crashlytics from '@react-native-firebase/crashlytics';
import BackgroundGeolocation from 'react-native-background-geolocation';

BackgroundGeolocation.registerHeadlessTask(async (event: any) => {
  try {
    console.log('[BackgroundGeolocation HeadlessTask] -', JSON.stringify(event));
    if (event.name === 'heartbeat') {
      const position = await BackgroundGeolocation.getCurrentPosition({
        samples: 1,
      });
      crashlytics().log(JSON.stringify(position));
      crashlytics().recordError(new Error('Localização em background'));
    }
  } catch (error: unknown) {
    if (error instanceof Error) crashlytics().recordError(error);
  }
});
