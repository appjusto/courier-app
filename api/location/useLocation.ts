import { useContextProfile, useContextUserId } from '@/common/auth/AuthContext';
import firebase from '@react-native-firebase/app';
import { useEffect, useState } from 'react';
import BackgroundGeolocation, { Location } from 'react-native-background-geolocation';
import { useContextApi } from '../ApiContext';

export const useLocation = () => {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const courierId = useContextUserId();
  const status = profile?.status;
  const working = status === 'available' || status === 'dispatching';
  // state
  const [location, setLocation] = useState<Location>();
  // side effects
  // event handlers
  useEffect(() => {
    const onLocation = BackgroundGeolocation.onLocation((location) => {
      console.log('[onLocation]', location);
      setLocation(location);
    });

    const onMotionChange = BackgroundGeolocation.onMotionChange((event) => {
      console.log('[onMotionChange]', event);
    });

    const onActivityChange = BackgroundGeolocation.onActivityChange((event) => {
      console.log('[onActivityChange]', event);
    });

    const onProviderChange = BackgroundGeolocation.onProviderChange((event) => {
      console.log('[onProviderChange]', event);
    });

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    };
  }, []);
  useEffect(() => {
    console.log('useEffect working', working);
    if (working) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      setLocation(undefined);
    }
  }, [working]);
  useEffect(() => {
    if (!courierId) return;
    if (!working) return;
    if (!location) return;
    const { latitude, longitude } = location.coords;
    const coordinates = new firebase.firestore.GeoPoint(latitude, longitude);
    api
      .profile()
      .updateLocation(courierId, coordinates)
      .then(() => {
        console.log('updated!');
      });
  }, [api, courierId, working, location]);
};
