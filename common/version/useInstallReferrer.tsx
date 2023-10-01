import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { fromDate } from '@/api/firebase/timestamp';
import * as Application from 'expo-application';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useContextProfile } from '../auth/AuthContext';
import { serverTimestamp } from '../firebase/serverTimestamp';

export const useInstallReferrer = () => {
  // redux
  const api = useContextApi();
  const profile = useContextProfile();
  const courierId = profile?.id;
  const installReferrer = `${profile?.installReferrer?.utm_medium};${profile?.installReferrer?.utm_source}`;
  const getInstallationDetails = async () => {
    let referrer = '';
    let time: Date | null = null;
    try {
      referrer = await Application.getInstallReferrerAsync();
      time = await Application.getInstallationTimeAsync();
    } catch (error: unknown) {
      console.log(error);
    }
    return { referrer, time };
  };
  // side effects
  useEffect(() => {
    if (!courierId) return;
    if (installReferrer !== null) {
      getInstallationDetails()
        .then(({ referrer, time }) => {
          try {
            const utm = queryString.parse(referrer);
            if (utm && installReferrer === `${utm.utm_medium};${utm.utm_source}`) return;
            trackEvent('Instalação', { utm, time });
            api
              .profile()
              .updateProfile(courierId, {
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
  }, [courierId, installReferrer, api]);
};
