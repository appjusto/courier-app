import { onSimulator } from '@/common/version/device';
import crashlytics from '@react-native-firebase/crashlytics';
import BackgroundGeolocation from 'react-native-background-geolocation';

if (!onSimulator()) {
  BackgroundGeolocation.registerHeadlessTask(async (event: any) => {
    try {
      console.log('[BackgroundGeolocation HeadlessTask] -', JSON.stringify(event));
      if (event.name === 'heartbeat') {
        // auth().onAuthStateChanged((user) => {
        //   if (!user) return;
        // });
        // initApp();
        // const userId = auth().currentUser?.uid;
        // if (userId) {
        //   const position = await BackgroundGeolocation.getCurrentPosition({
        //     samples: 1,
        //   });
        //   const latlng = latlngFromLocation(position);
        //   if (latlng) {
        //     await new Api()
        //       .profile()
        //       .updateLocation(
        //         userId,
        //         new FirebaseFirestoreTypes.GeoPoint(latlng.latitude, latlng.longitude)
        //       );
        //     ShowToast('sent!');
        //   }
        // }
      }
    } catch (error: unknown) {
      if (error instanceof Error) crashlytics().recordError(error);
    }
  });
}
