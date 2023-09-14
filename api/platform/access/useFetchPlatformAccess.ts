import { useContextApi } from '@/api/ApiContext';
import { useContextUser } from '@/common/auth/AuthContext';
import { PlatformAccess } from '@appjusto/types';
import { useEffect, useState } from 'react';

export const useFetchPlatformAccess = () => {
  // context
  const api = useContextApi();
  const logged = Boolean(useContextUser());
  // state
  const [platformAccess, setPlatformAccess] = useState<PlatformAccess | null>();
  // side effects
  useEffect(() => {
    if (!logged) {
      setPlatformAccess(null);
      return;
    }
    api
      .platform()
      .fetchPlatformAccess()
      .then(setPlatformAccess)
      .catch((error: unknown) => {
        console.error(error);
        setPlatformAccess(null);
      });
  }, [api, logged]);
  return platformAccess;
};
