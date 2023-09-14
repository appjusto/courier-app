import { useContextUser } from '@/common/auth/AuthContext';
import { PlatformParams } from '@appjusto/types';
import React from 'react';
import { useContextApi } from '../../ApiContext';

export const useFetchPlatformParams = () => {
  // context
  const api = useContextApi();
  const logged = Boolean(useContextUser());
  // state
  const [params, setParams] = React.useState<PlatformParams | null>();
  // side effects
  React.useEffect(() => {
    if (!logged) {
      setParams(null);
      return;
    }
    api
      .platform()
      .fetchPlatformParams()
      .then(setParams)
      .catch((error) => {
        console.error(error);
        setParams(null);
      });
  }, [api, logged]);
  // result
  return params;
};
