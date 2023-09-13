import { useContextProfile } from '@/common/auth/AuthContext';
import { getEnv, getFirebaseRegion, getManifestExtra } from '@/extra';
import { LatLng } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { latlngFromLocation } from '../latlngFromLocation';

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
  // side effects
  useEffect(() => {
    const onLocation = BackgroundGeolocation.onLocation((value) => {
      console.log('[onLocation]', value);
      setLocation(latlngFromLocation(value));
    });

    const onHeartbeat = BackgroundGeolocation.onHeartbeat((event) => {
      console.log('[onHeartbeat]', event);
      if (Platform.OS === 'android') {
        ToastAndroid.show('heartbeat', 1000);
      }
    });

    const onMotionChange = BackgroundGeolocation.onMotionChange((event) => {
      console.log('[onMotionChange]', event);
      if (Platform.OS === 'android') {
        ToastAndroid.show('motion: ' + event.location.activity.type, 1000);
      }
    });

    const onActivityChange = BackgroundGeolocation.onActivityChange((event) => {
      if (event.activity === 'in_vehicle') {
      } else if (event.activity === 'on_bicycle') {
      } else if (event.activity === 'on_foot') {
      } else if (event.activity === 'walking') {
      }
      console.log('[onActivityChange]', event);
      if (Platform.OS === 'android') {
        ToastAndroid.show('activity: ' + event.activity, 1000);
      }
    });

    BackgroundGeolocation.reset({
      backgroundPermissionRationale: {
        title: 'Permitir acesso à sua localização em background',
        message:
          'Para obter sua localização com precisão, por favor permita que o App obtenha sua localização o tempo todo.',
        positiveAction: 'Configurar',
        negativeAction: 'Cancelar',
      },
      locationAuthorizationAlert: {
        titleWhenOff: 'Localização indisponível',
        titleWhenNotEnabled: 'Localização em background indisponível',
        instructions:
          'Para obter sua localização com precisão, por favor permita que o App obtenha sua localização o tempo todo.',
        settingsButton: 'Configurar',
        cancelButton: 'Cancelar',
      },
      notification: {
        title: 'Acompanhando sua localização',
        text: 'Acompanhamos sua localização para enviar corridas próximas e monitorar a entrega.',
      },
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 5,
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      enableHeadless: true,
      startOnBoot: true,
      stopOnTerminate: false,
      heartbeatInterval: 60,
      // triggerActivities: 'in_vehicle, on_bicycle',
      // preventSuspend: true,
      url: `https://${getFirebaseRegion()}-app-justo-${getEnv()}.cloudfunctions.net/onLocationUpdate`,
      headers: {
        authorization: getManifestExtra().location.secret,
      },
      params: {
        userId,
        userToken,
        userFlavor: 'courier',
        orderId,
      },
    }).then((state) => {
      // console.log('useConfigLocation', JSON.stringify(state));
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
    if (!enabled) return;
    if (Platform.OS === 'android') {
      ToastAndroid.show('ready:' + ready, 1000);
    }
    if (ready) {
      BackgroundGeolocation.start().then((value) => {
        BackgroundGeolocation.getCurrentPosition({
          samples: 1,
          persist: false,
        })
          .then((value) => {
            console.log('value', value);
            setLocation(latlngFromLocation(value));
          })
          .catch((error: unknown) => {
            console.error(error);
          });
      });
    } else {
      BackgroundGeolocation.stop()
        .then((state) => {})
        .catch((error: unknown) => {});
    }
  }, [enabled, ready]);
  return location;
};
