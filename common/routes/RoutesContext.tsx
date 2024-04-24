import { useContextApi } from '@/api/ApiContext';
import { router, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { useContextProfile } from '../auth/AuthContext';
import { processURL } from '../deeplink/processURL';
import {
  useContextDeeplink,
  useContextSetDeeplink,
} from '../notifications/context/NotificationContext';
import { useNotifications } from '../notifications/useNotifications';

interface Props {
  children: React.ReactNode;
}

interface Value {}

const RoutesContext = React.createContext<Value>({});

export const RoutesProvider = (props: Props) => {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const deeplink = useContextDeeplink();
  const setDeeplink = useContextSetDeeplink();
  const segments = useSegments();
  const restricted = segments[0] === '(logged)';
  const situation = profile === null ? null : profile?.situation;
  console.log(segments);
  // state
  const [bootstrapped, setBootstrapped] = useState(false);
  // side effects
  useNotifications();
  // deeplink fix https://github.com/expo/router/issues/818
  useEffect(() => {
    Linking.addEventListener('url', ({ url }) => {
      // console.log('Linking', url, processURL(url));
      setDeeplink(processURL(url));
    });
  }, [setDeeplink]);
  // notifications deeplink
  useEffect(() => {
    if (!bootstrapped) return;
    if (!deeplink) return;
    // @ts-ignore
    router.push(deeplink);
    setDeeplink(undefined);
  }, [bootstrapped, deeplink, setDeeplink]);
  // routing
  useEffect(() => {
    if (situation === undefined) return;
    if (situation === null) {
      if (restricted) router.replace('/welcome');
    } else if (situation === 'pending') {
      router.replace('/pending');
    } else if (situation === 'submitted') {
      router.replace('/submitted');
    } else if (situation === 'verified') {
      if (!api.profile().justSubmitted) {
        router.replace('/submitted');
      }
    } else if (situation === 'approved') {
      if (!bootstrapped) {
        if (!restricted) router.replace('/home');
        setBootstrapped(true);
      }
    } else if (situation === 'rejected' || situation === 'invalid') {
      router.replace('/rejected');
    } else if (situation === 'blocked') {
      router.replace('/blocked');
      // @ts-expect-error
    } else if (situation === 'blocked2') {
      router.replace('/blocked');
    }
  }, [situation, restricted, api, bootstrapped]);
  // result
  return <RoutesContext.Provider value={{}}>{props.children}</RoutesContext.Provider>;
};
