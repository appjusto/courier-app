import { useContextProfile } from '@/common/auth/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
interface Props {
  children: React.ReactNode;
}

interface Value {
  availabilityModalShown: boolean;
  setAvailabilityModalShown: (value: boolean) => void;
}

const PreferencesContext = React.createContext<Value>({
  availabilityModalShown: false,
  setAvailabilityModalShown: (value) => {},
});

export const PreferencesProvider = (props: Props) => {
  // context
  const profile = useContextProfile();
  const status = profile?.status;
  // state
  const [availabilityModalShown, setAvailabilityModalShown] = useState(false);
  // side effects
  useEffect(() => {
    if (status === 'available') {
      setAvailabilityModalShown(true);
    }
  }, [status]);
  // result
  return (
    <PreferencesContext.Provider value={{ availabilityModalShown, setAvailabilityModalShown }}>
      {props.children}
    </PreferencesContext.Provider>
  );
};

export const useContextAvailabilityModal = () => {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value;
};
