import { CourierCosts } from '@appjusto/types';
import React from 'react';
import { useContextApi } from '../../ApiContext';

export const useObserveCourierCosts = () => {
  // context
  const api = useContextApi();
  // state
  const [costs, setCosts] = React.useState<Partial<CourierCosts> | null>();
  // side effects
  // observe fleet
  React.useEffect(() => {
    return api.couriers().observeCourierCosts(setCosts);
  }, [api]);
  // result
  return costs;
};
