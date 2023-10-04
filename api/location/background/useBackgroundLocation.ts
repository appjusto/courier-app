import { useContextProfile } from '@/common/auth/AuthContext';
import { LatLng } from '@appjusto/types';
import crashlytics from '@react-native-firebase/crashlytics';
import { useEffect, useState } from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { latlngFromLocation } from '../latlngFromLocation';
import { configBackgroundGeolocation } from './configBackgroundGeolocation';
import { startBackgroundGeolocation } from './startBackgroundGeolocation';

export const useBackgroundLocation = (enabled: boolean) => {
  // context
  const profile = useContextProfile();
  const userId = profile?.id;
  const userToken = profile?.notificationPreferencesToken;
  // state
  const [ready, setReady] = useState(false);
  const [location, setLocation] = useState<LatLng>();
  // side effects
  useEffect(() => {
    const onLocation = BackgroundGeolocation.onLocation((value) => {
      setLocation(latlngFromLocation(value));
    });
    configBackgroundGeolocation({
      userId,
      userToken,
      userFlavor: 'courier',
    }).then(() => {
      setReady(true);
    });

    return () => {
      onLocation.remove();
    };
  }, [userId, userToken]);
  useEffect(() => {
    if (!ready) return;
    if (enabled) {
      // console.log('starting...');
      startBackgroundGeolocation()
        .then((value) => {
          if (value) setLocation(latlngFromLocation(value));
        })
        .catch((error: unknown) => {
          if (error instanceof Error) crashlytics().recordError(error);
        });
    } else {
      BackgroundGeolocation.stop()
        .then((state) => {})
        .catch((error: unknown) => {
          if (error instanceof Error) crashlytics().recordError(error);
        });
    }
  }, [enabled, ready]);
  return { location };
};
