import { useContextApi } from '@/api/ApiContext';
import { useContextUser } from '@/common/auth/AuthContext';
import { PlatformFees } from '@appjusto/types';
import { useEffect, useState } from 'react';

export const useFetchPlatformFees = () => {
  // context
  const api = useContextApi();
  const logged = Boolean(useContextUser());
  // state
  const [platformFees, setPlatformFees] = useState<PlatformFees | null>();
  // side effects
  useEffect(() => {
    if (!logged) {
      setPlatformFees(null);
      return;
    }
    api
      .platform()
      .fetchPlatformFees()
      .then(setPlatformFees)
      .catch((error: unknown) => {
        console.error(error);
        setPlatformFees(null);
      });
  }, [api, logged]);
  return platformFees;
};
