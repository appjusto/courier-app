import { useContextUserId } from '@/common/auth/AuthContext';
import firebase from '@react-native-firebase/app';
import { useEffect, useState } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import BackgroundGeolocation, { Location } from 'react-native-background-geolocation';
import { useContextApi } from '../ApiContext';

export const useLocation = (enabled: boolean) => {
  // context
  const api = useContextApi();
  const courierId = useContextUserId();
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
  // update location
  useEffect(() => {
    if (!courierId) return;
    if (!enabled) return;
    if (!location) return;
    const { latitude, longitude } = location.coords;
    const coordinates = new firebase.firestore.GeoPoint(latitude, longitude);
    api
      .profile()
      .updateLocation(courierId, coordinates)
      .then(() => {
        console.log('updated!');
      });
  }, [api, courierId, enabled, location]);
  // result
  return location;
};
