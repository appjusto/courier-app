import { useContextApi } from '@/api/ApiContext';
import { useProfile } from '@/api/profile/useProfile';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { useContextUser } from '../auth/AuthContext';
import { serverTimestamp } from '../firebase/serverTimestamp';
import { getExpoPushToken } from './getExpoPushToken';

export const useNotifications = () => {
  // context
  const api = useContextApi();
  const userId = useContextUser()?.uid;
  const profile = useProfile();
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
  // handle token update
  useEffect(() => {
    const subscription = Notifications.addPushTokenListener((token) => {
      if (typeof token.data === 'string') {
        console.log('token updated:', token.data);
        setNotificationToken(token.data);
      }
    });
    return () => subscription.remove();
  }, []);
  // update profile with token
  useEffect(() => {
    console.log('useNotifications', userId, currentNotificationToken, notificationToken);
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
