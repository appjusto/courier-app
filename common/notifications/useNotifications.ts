import { useContextApi } from '@/api/ApiContext';
import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import { useContextProfile, useContextUser } from '../auth/AuthContext';
import { serverTimestamp } from '../firebase/serverTimestamp';
import { getExpoPushToken } from './getExpoPushToken';

export const useNotifications = () => {
  // context
  const api = useContextApi();
  const userId = useContextUser()?.uid;
  const profile = useContextProfile();
  const currentNotificationToken = profile?.notificationToken;
  // state
  const [notificationToken, setNotificationToken] = useState<string | null>();
  // side effects
  useEffect(() => {
    getExpoPushToken(5)
      .then(setNotificationToken)
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // update profile with token
  useEffect(() => {
    if (!Device.isDevice) return;
    if (!userId) return;
    if (notificationToken === undefined) return;
    if (notificationToken === currentNotificationToken) return;
    api
      .getProfile()
      .updateProfile(userId, { notificationToken, updatedOn: serverTimestamp() })
      .catch(console.error);
  }, [api, currentNotificationToken, notificationToken, userId]);
};
