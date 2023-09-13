import { useToast } from '@/common/components/views/toast/ToastContext';
import { LatLng, RouteDetails } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { useContextInitialLocation } from '../location/context/useContextInitialLocation';

export const useMapRoute = (to?: LatLng) => {
  // context
  const api = useContextApi();
  const { showToast } = useToast();
  // state
  const location = useContextInitialLocation();
  const [route, setRoute] = useState<RouteDetails | null>();
  // side effects
  useEffect(() => {
    if (!to) return;
    if (location === undefined) return;
    if (location === null) {
      showToast('Não foi possível obter sua localização. Verifique suas configurações', 'warning');
      setRoute(null);
      return;
    }
    api
      .maps()
      .googleDirections(location, to, 'car')
      .then((result) => {
        setRoute(result);
      })
      .catch((error: unknown) => {
        setRoute(null);
        if (error instanceof Error) {
          showToast(error.message, 'warning');
        }
      });
  }, [api, showToast, location, to]);
  // result
  console.log('location:', location, '; to:', to, '; route distance:', route?.distance);
  return route;
};
