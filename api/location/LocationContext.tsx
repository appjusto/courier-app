import { useContextProfile } from '@/common/auth/AuthContext';
import React from 'react';
import { Location } from 'react-native-background-geolocation';
import { useConfigLocation } from './useConfigLocation';
import { useLocation } from './useLocation';

interface Props {
  children: React.ReactNode;
}

interface Value {
  location?: Location;
}

const LocationContext = React.createContext<Value>({});

export const LocationProvider = (props: Props) => {
  // context
  const profile = useContextProfile();
  const status = profile?.status;
  const working = status === 'available' || status === 'dispatching';
  // state
  const ready = useConfigLocation();
  const location = useLocation(ready && working);
  // result
  return <LocationContext.Provider value={{ location }}>{props.children}</LocationContext.Provider>;
};

export const useContextLocation = () => {
  const value = React.useContext(LocationContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.location;
};
