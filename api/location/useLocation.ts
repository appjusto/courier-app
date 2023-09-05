import crashlytics from '@react-native-firebase/crashlytics';
import { useEffect, useState } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import { BackgroundGeolocation, Subscription } from 'react-native-background-geolocation';

export const useLocation = () => {
  // state
  const [enabled, setEnabled] = useState<boolean>();
  const [location, setLocation] = useState('');
  // side effects
  //
  useEffect(() => {
    try {
      // handlers
      const onLocation: Subscription = BackgroundGeolocation.onLocation((location) => {
        console.log('[onLocation]', location);
        setLocation(JSON.stringify(location, null, 2));
      });
      // setup
      BackgroundGeolocation.ready({
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        debug: true,
        stopOnTerminate: false,
        startOnBoot: true,
        // enableHeadless: true,
      }).then((state) => {
        console.log('[ready] BackgroundGeolocation is configured and ready to use');
        console.log(state);
        setEnabled(true);
      });
      return () => {
        onLocation.remove();
      };
    } catch (error: unknown) {
      if (error instanceof Error) crashlytics().recordError(error);
    }
  }, []);
  // side effects
  // start / stop
  useEffect(() => {
    console.log(enabled);
    try {
      if (enabled === undefined) return;
      if (Platform.OS === 'android') {
        ToastAndroid.show('enabled: ' + enabled, 1000);
      }
      if (enabled) {
        BackgroundGeolocation.start();
      } else {
        BackgroundGeolocation.stop();
      }
    } catch (error: unknown) {
      if (error instanceof Error) crashlytics().recordError(error);
    }
  }, [enabled]);
  // show location on toast
  useEffect(() => {
    if (!location) return;
    if (Platform.OS === 'android') {
      ToastAndroid.show(JSON.stringify(location, null, 2), 1000);
    }
  }, [location]);
};
