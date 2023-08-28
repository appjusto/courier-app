import { ProfileChange, WithId } from '@appjusto/types';
import React from 'react';
import { useContextApi } from '../ApiContext';

export const useRequestedProfileChanges = (accountId: string | undefined) => {
  // context
  const api = useContextApi();
  // state
  const [profileChanges, setProfileChanges] = React.useState<WithId<ProfileChange> | null>();
  // side-effects
  React.useEffect(() => {
    if (!accountId) return;
    (async () => {
      return api.profile().observePendingChange(accountId, setProfileChanges);
    })();
  }, [accountId, api]);
  return profileChanges;
};
