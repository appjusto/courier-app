import { useContextProfile } from '@/common/auth/AuthContext';
import { getEnv, getFirebaseRegion, getManifestExtra } from '@/extra';
import { useEffect, useState } from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';

export const useConfigLocation = () => {
  // context
  const profile = useContextProfile();
  const userId = profile?.id;
  const userToken = profile?.notificationPreferencesToken;
  // TODO: get from context
  const orderId = null;
  // state
  const [ready, setReady] = useState(false);
  // side effects
  useEffect(() => {
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
  }, [userId, userToken]);
  return ready;
};
