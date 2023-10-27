import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { fromDate } from '@/api/firebase/timestamp';
import * as Application from 'expo-application';
import queryString from 'query-string';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useContextProfile } from '../auth/AuthContext';
import { serverTimestamp } from '../firebase/serverTimestamp';
import { onSimulator } from './device';

export const useInstallReferrer = () => {
  // redux
  const api = useContextApi();
  const profile = useContextProfile();
  const profileLoaded = Boolean(profile);
  const installReferrer = profile?.installReferrer;
  // helpers
  const getInstallationDetails = async () => {
    let referrer = '';
    let time: Date | null = null;
    try {
      if (Platform.OS === 'android') {
        referrer = await Application.getInstallReferrerAsync();
      }
      time = await Application.getInstallationTimeAsync();
    } catch (error: unknown) {
      console.log(error);
    }
    return { referrer, time };
  };
  // side effects
  useEffect(() => {
    if (onSimulator()) return;
    if (Platform.OS !== 'android') return;
    if (!profileLoaded) return;
    if (installReferrer !== null) {
      getInstallationDetails()
        .then(({ referrer, time }) => {
          try {
            const utm = queryString.parse(referrer);
            const ir = `${installReferrer?.utm_medium};${installReferrer?.utm_source}`;
            if (utm && ir === `${utm.utm_medium};${utm.utm_source}`) return;
            trackEvent('Instalação', { utm, time });
            api
              .profile()
              .updateProfile({
                installReferrer: {
                  ...(utm ?? {}),
                  updatedAt: serverTimestamp(),
                  installedAt: time ? fromDate(time) : null,
                },
              })
              .then(null);
          } catch (error) {
            console.error(error);
          }
        })
        .catch(() => {});
    }
  }, [profileLoaded, installReferrer, api]);
};
