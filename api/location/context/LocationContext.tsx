import { useContextProfile } from '@/common/auth/AuthContext';
import { CourierMode, LatLng } from '@appjusto/types';
import React from 'react';
import { useBackgroundLocation } from '../background/useBackgroundLocation';

interface Props {
  children: React.ReactNode;
}

interface Value {
  location?: LatLng;
  mode?: CourierMode;
}

const LocationContext = React.createContext<Value>({});

export const LocationProvider = (props: Props) => {
  // context
  // const api = useContextApi();
  const profile = useContextProfile();
  // const userId = profile?.id;
  const status = profile?.status;
  const working = status === 'available' || status === 'dispatching';
  // state
  // const { location, mode } = useBackgroundLocation(working);
  const { location } = useBackgroundLocation(working);
  // side effects
  // useEffect(() => {
  //   if (!userId) return;
  //   if (!mode) return;
  //   api.profile().updateProfile({ mode }).then(null);
  // }, [api, userId, mode]);
  // result
  return <LocationContext.Provider value={{ location }}>{props.children}</LocationContext.Provider>;
};

export const useContextLocation = () => {
  const value = React.useContext(LocationContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.location;
};

// export const useContextMode = () => {
//   const value = React.useContext(LocationContext);
//   if (!value) throw new Error('Api fora de contexto.');
//   return value.mode;
// };
