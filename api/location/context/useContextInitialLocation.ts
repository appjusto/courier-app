import { LatLng } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextLocation } from './LocationContext';

export const useContextInitialLocation = () => {
  // context
  const location = useContextLocation();
  // state
  const [initialLocation, setInitialLocation] = useState<LatLng>();
  // side effects
  // update location once
  useEffect(() => {
    if (!location) return;
    if (initialLocation) return;
    setInitialLocation(location);
  }, [location, initialLocation]);
  // result
  console.log('useContextInitialLocation', initialLocation);
  return initialLocation;
};
