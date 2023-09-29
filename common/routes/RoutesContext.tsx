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
  const profile = useContextProfile();
  const segments = useSegments();
  const restricted = segments[0] === '(logged)';
  const situation = profile === null ? null : profile?.situation;
  console.log(segments);
  // side effects
  // routing
  useEffect(() => {
    if (situation === undefined) return;
    if (situation === null) router.replace('/welcome');
    else if (situation === 'pending') {
      router.replace('/pending');
    } else if (situation === 'submitted' || situation === 'verified') {
      router.replace('/submitted');
    }
  }, [situation]);

  useEffect(() => {
    if (restricted) {
      if (situation === null) router.replace('/sign-in');
    }
  }, [situation, restricted]);
  // result
  return <RoutesContext.Provider value={{}}>{props.children}</RoutesContext.Provider>;
};
