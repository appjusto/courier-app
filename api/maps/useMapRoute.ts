import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { CourierMode, LatLng, RouteDetails } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { useContextInitialLocation } from '../location/context/useContextInitialLocation';

export const useMapRoute = (to?: LatLng, mode?: CourierMode) => {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // state
  const location = useContextInitialLocation();
  const [route, setRoute] = useState<RouteDetails | null>();
  // side effects
  useEffect(() => {
    console.log('useMapRoute', to, mode, location);
    if (!to) return;
    if (!mode) return;
    if (location === undefined) return;
    if (location === null) {
      showToast('Não foi possível obter sua localização. Verifique suas configurações', 'warning');
      setRoute(null);
      return;
    }
    api
      .maps()
      .googleDirections(location, to, mode)
      .then((result) => {
        setRoute(result);
      })
      .catch((error: unknown) => {
        setRoute(null);
        if (error instanceof Error) {
          showToast(error.message, 'warning');
        }
      });
  }, [api, showToast, location, to, mode]);
  // result
  console.log('location:', location, '; to:', to, '; route distance:', route?.distance);
  return route;
};
