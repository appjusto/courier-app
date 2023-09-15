import { useContextProfile } from '@/common/auth/AuthContext';
import { ShowToast } from '@/common/components/toast/Toast';
import { getEnv, getFirebaseRegion, getManifestExtra } from '@/extra';
import { CourierMode, LatLng } from '@appjusto/types';
import { useEffect, useState } from 'react';
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
        // } else if (event.activity === 'on_foot') {
        //   setMode('walking');
        // } else if (event.activity === 'walking') {
        //   setMode('walking');
      }
      // console.log('[onActivityChange]', event);
      ShowToast('activity: ' + event.activity);
    });
    BackgroundGeolocation.reset().then(() => {
      BackgroundGeolocation.ready({
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
        // console.log('ready:', state);
        setReady(true);
      });
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
    // console.log('effect; ready:', ready, '; enabled:', enabled);
    if (!enabled) return;
    ShowToast('ready:' + ready);
    if (ready) {
      // console.log('starting...');
      BackgroundGeolocation.start()
        .then((value) => {
          BackgroundGeolocation.getCurrentPosition({
            samples: 1,
            persist: false,
          })
            .then((value) => {
              // console.log('value', value);
              setLocation(latlngFromLocation(value));
            })
            .catch((error: unknown) => {
              console.error(error);
            });
        })
        .catch((error: unknown) => {
          console.error(error);
        });
    } else {
      BackgroundGeolocation.stop()
        .then((state) => {})
        .catch((error: unknown) => {});
    }
  }, [enabled, ready]);
  return { location, mode };
};
