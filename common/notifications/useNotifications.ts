import { useContextApi } from '@/api/ApiContext';

import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import { useContextProfile } from '../auth/AuthContext';
import { useShowToast } from '../components/views/toast/ToastContext';
import { serverTimestamp } from '../firebase/serverTimestamp';
import { getExpoPushToken } from './getExpoPushToken';

export const useNotifications = () => {
  // context
  const showToast = useShowToast();
  const api = useContextApi();
  const profile = useContextProfile();
  const currentNotificationToken = profile?.notificationToken;
  // state
  const [notificationToken, setNotificationToken] = useState<string | null>();
  // side effects
  useEffect(() => {
    getExpoPushToken(5)
      .then(setNotificationToken)
      .catch((error: unknown) => {
        console.error(error);
        showToast(
          'Não foi configurar o App para receber notificações. Verifique as permissões.',
          'error'
        );
      });
  }, [showToast]);
  // update profile with token
  useEffect(() => {
    if (!Device.isDevice) return;
    if (notificationToken === undefined) return;
    if (notificationToken === currentNotificationToken) return;
    api
      .profile()
      .updateProfile({ notificationToken, updatedOn: serverTimestamp() })
      .catch(console.error);
  }, [api, currentNotificationToken, notificationToken]);
};
