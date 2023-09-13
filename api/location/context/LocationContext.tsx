import { useContextProfile } from '@/common/auth/AuthContext';
import { LatLng } from '@appjusto/types';
import React from 'react';
import { useBackgroundLocation } from '../background/useBackgroundLocation';

interface Props {
  children: React.ReactNode;
}

interface Value {
  location?: LatLng;
}

const LocationContext = React.createContext<Value>({});

export const LocationProvider = (props: Props) => {
  // context
  const profile = useContextProfile();
  const status = profile?.status;
  const working = status === 'available' || status === 'dispatching';
  // state
  const location = useBackgroundLocation(working);
  // result
  return <LocationContext.Provider value={{ location }}>{props.children}</LocationContext.Provider>;
};

export const useContextLocation = () => {
  const value = React.useContext(LocationContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.location;
};
