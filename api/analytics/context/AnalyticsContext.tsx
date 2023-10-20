import { useContextProfile } from '@/common/auth/AuthContext';
import { useUniqState } from '@/common/react/useUniqState';
import { useInstallReferrer } from '@/common/version/useInstallReferrer';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { useGlobalSearchParams, usePathname } from 'expo-router';
import { pick } from 'lodash';
import React, { useEffect } from 'react';
import { trackEvent } from '../track';
interface Props {
  children: React.ReactNode;
}

interface Value {}

const AnalyticsContext = React.createContext<Value>({});

export const AnalyticsProvider = (props: Props) => {
  // context
  const profile = useContextProfile();
  const userProperties = useUniqState(profile ? pick(profile, ['id']) : undefined);
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  // side effects
  useEffect(() => {
    if (userProperties === undefined) return;
    console.log('analytics', userProperties);
    crashlytics().setUserId(userProperties.id);
    analytics().setUserId(userProperties.id);
    analytics().setUserProperties(userProperties);
  }, [userProperties]);
  useInstallReferrer();
  useEffect(() => {
    trackEvent('path_update', { pathname, params });
  }, [pathname, params]);
  // result
  return <AnalyticsContext.Provider value={{}}>{props.children}</AnalyticsContext.Provider>;
};
