import { useLocationDisclosureStatus } from '@/api/location/useLocationDisclosureStatus';
import { useContextProfile } from '@/common/auth/AuthContext';
import { LatLng } from '@appjusto/types';
import React from 'react';
import { useBackgroundLocation } from '../background/useBackgroundLocation';

interface Props {
  children: React.ReactNode;
}

interface Value {
  location?: LatLng;
  shouldShowLocationDisclosure?: boolean;
  setLocationDisclosureShown?: () => void;
}

const LocationContext = React.createContext<Value>({});

export const LocationProvider = (props: Props) => {
  // context
  const profile = useContextProfile();
  const status = profile?.status;
  const working = status === 'available' || status === 'dispatching';
  // state
  const { shouldShowLocationDisclosure, setLocationDisclosureShown } =
    useLocationDisclosureStatus();
  const { location } = useBackgroundLocation(working && !shouldShowLocationDisclosure);
  // result
  return (
    <LocationContext.Provider
      value={{ location, shouldShowLocationDisclosure, setLocationDisclosureShown }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export const useContextLocation = () => {
  const value = React.useContext(LocationContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.location;
};

export const useContextShouldShowLocationDisclosure = () => {
  const value = React.useContext(LocationContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.shouldShowLocationDisclosure;
};

export const useContextSetLocationDisclosureShown = () => {
  const value = React.useContext(LocationContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.setLocationDisclosureShown!;
};
