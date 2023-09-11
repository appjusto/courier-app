import { useEffect, useState } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import BackgroundGeolocation, { Location } from 'react-native-background-geolocation';

export const useLocation = (enabled: boolean) => {
  // state
  const [location, setLocation] = useState<Location>();
  // side effects
  // registering handlers
  useEffect(() => {
    const onLocation = BackgroundGeolocation.onLocation((location) => {
      console.log('[onLocation]', location);
      setLocation(location);
    });
    const onHeartbeat = BackgroundGeolocation.onHeartbeat((event) => {
      console.log('[onHeartbeat]', event);
      BackgroundGeolocation.getCurrentPosition({
        samples: 1,
        persist: true,
      }).then((location) => {
        console.log('[getCurrentPosition] ', location);
        if (Platform.OS === 'android') {
          ToastAndroid.show('heartbeat: ' + location.activity.type, 1000);
        }
      });
    });

    const onMotionChange = BackgroundGeolocation.onMotionChange((event) => {
      console.log('[onMotionChange]', event);
      ToastAndroid.show('motion: ' + event.location.activity.type, 1000);
    });

    const onActivityChange = BackgroundGeolocation.onActivityChange((event) => {
      if (event.activity === 'in_vehicle') {
      } else if (event.activity === 'on_bicycle') {
      } else if (event.activity === 'on_foot') {
      } else if (event.activity === 'walking') {
      }
      console.log('[onActivityChange]', event);
      ToastAndroid.show('activity: ' + event.activity, 1000);
    });

    const onProviderChange = BackgroundGeolocation.onProviderChange((event) => {
      console.log('[onProviderChange]', event);
    });

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove();
      onHeartbeat.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    };
  }, []);
  // start/stop background geoloaction
  useEffect(() => {
    console.log('useEffect working', enabled);
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      setLocation(undefined);
    }
  }, [enabled]);
  // result
  return location;
};
