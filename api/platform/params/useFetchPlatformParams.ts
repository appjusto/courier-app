import { PlatformParams } from '@appjusto/types';
import React from 'react';
import { useContextApi } from '../../ApiContext';

export const useFetchPlatformParams = () => {
  // context
  const api = useContextApi();
  // state
  const [params, setParams] = React.useState<PlatformParams | null>();
  // side effects
  // observe fleet
  React.useEffect(() => {
    api
      .platform()
      .fetchPlatformParams()
      .then(setParams)
      .catch((error) => {
        console.error(error);
        setParams(null);
      });
  }, [api]);
  // result
  return params;
};
