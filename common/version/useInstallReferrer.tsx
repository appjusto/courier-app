import { useContextApi } from '@/api/ApiContext';
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
  // side effects
  useEffect(() => {
    if (!courierId) return;
    if (installReferrer !== null) {
      Application.getInstallReferrerAsync()
        .then((value) => {
          try {
            const utm = queryString.parse(value);
            if (utm && installReferrer === `${utm.utm_medium};${utm.utm_source}`) return;
            api
              .profile()
              .updateProfile(courierId, {
                installReferrer: { ...(utm ?? {}), updatedAt: serverTimestamp() },
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
