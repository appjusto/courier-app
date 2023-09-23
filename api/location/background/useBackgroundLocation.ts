import { useContextProfile } from '@/common/auth/AuthContext';
import { ShowToast } from '@/common/components/toast/Toast';
import { CourierMode, LatLng } from '@appjusto/types';
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
  // TODO: get from context
  const orderId = null;
  // state
  const [ready, setReady] = useState(false);
  const [location, setLocation] = useState<LatLng>();
  const [mode, setMode] = useState<CourierMode>();
  // side effects
  useEffect(() => {
    // console.log('configuring callbacks', userId, userToken);
    const onLocation = BackgroundGeolocation.onLocation((value) => {
      // console.log('[onLocation]', value);
      setLocation(latlngFromLocation(value));
    });

    const onHeartbeat = BackgroundGeolocation.onHeartbeat((event) => {
      // console.log('[onHeartbeat]', event);
      ShowToast('heartbeat');
    });

    const onMotionChange = BackgroundGeolocation.onMotionChange((event) => {
      // console.log('[onMotionChange]', event);
      ShowToast('motion: ' + event.location.activity.type);
    });

    const onActivityChange = BackgroundGeolocation.onActivityChange((event) => {
      if (event.activity === 'in_vehicle') {
        setMode('motorcycle');
      } else if (event.activity === 'on_bicycle') {
        setMode('bicycling');
      } else if (event.activity === 'on_foot') {
        setMode('walking');
      } else if (event.activity === 'walking') {
        setMode('walking');
      }
      // console.log('[onActivityChange]', event);
      ShowToast('activity: ' + event.activity);
    });
    configBackgroundGeolocation({
      userId,
      userToken,
      userFlavor: 'courier',
      orderId,
    }).then(() => {
      setReady(true);
    });

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove();
      onHeartbeat.remove();
      onMotionChange.remove();
      onActivityChange.remove();
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
  return { location, mode };
};
