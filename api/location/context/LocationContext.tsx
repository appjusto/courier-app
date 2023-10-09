import {
  LocationDisclosureStatus,
  useLocationDisclosureStatus,
} from '@/api/location/useLocationDisclosureStatus';
import { useContextProfile } from '@/common/auth/AuthContext';
import { LatLng } from '@appjusto/types';
import React from 'react';
import { useBackgroundLocation } from '../background/useBackgroundLocation';

interface Props {
  children: React.ReactNode;
}

interface Value {
  location?: LatLng;
  locationDisclosureStatus?: LocationDisclosureStatus;
  setLocationDisclosureShown?: () => void;
}

const LocationContext = React.createContext<Value>({});

export const LocationProvider = (props: Props) => {
  // context
  const profile = useContextProfile();
  const status = profile?.status;
  const working = status === 'available' || status === 'dispatching';
  // state
  const { locationDisclosureStatus, setLocationDisclosureShown } = useLocationDisclosureStatus();
  const { location } = useBackgroundLocation(working && locationDisclosureStatus === 'shown');
  // result
  return (
    <LocationContext.Provider
      value={{ location, locationDisclosureStatus, setLocationDisclosureShown }}
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

export const useContextLocationDisclosureStatus = () => {
  const value = React.useContext(LocationContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.locationDisclosureStatus;
};

export const useContextSetLocationDisclosureShown = () => {
  const value = React.useContext(LocationContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.setLocationDisclosureShown!;
};
