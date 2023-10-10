import { useContextApi } from '@/api/ApiContext';
import { router, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { useContextProfile } from '../auth/AuthContext';

interface Props {
  children: React.ReactNode;
}

interface Value {}

const RoutesContext = React.createContext<Value>({});

export const RoutesProvider = (props: Props) => {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const segments = useSegments();
  const restricted = segments[0] === '(logged)';
  const situation = profile === null ? null : profile?.situation;
  console.log(segments);
  // side effects
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
      if (!restricted) router.replace('/home');
    } else if (situation === 'rejected') {
      router.replace('/rejected');
    } else if (situation === 'blocked') {
      router.replace('/blocked');
      // @ts-expect-error
    } else if (situation === 'blocked2') {
      router.replace('/blocked');
    }
  }, [situation, restricted, api]);
  // result
  return <RoutesContext.Provider value={{}}>{props.children}</RoutesContext.Provider>;
};
