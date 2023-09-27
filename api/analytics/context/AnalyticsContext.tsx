import analytics from '@react-native-firebase/analytics';
import { useGlobalSearchParams, usePathname } from 'expo-router';
import React, { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

interface Value {}

const AnalyticsContext = React.createContext<Value>({});

export const AnalyticsProvider = (props: Props) => {
  // context
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  useEffect(() => {
    analytics().logEvent('path_update', { pathname, params });
  }, [pathname, params]);
  // result
  return <AnalyticsContext.Provider value={{}}>{props.children}</AnalyticsContext.Provider>;
};
