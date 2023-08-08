import { UserProfile, WithId } from '@appjusto/types';
import React from 'react';
import { useContextUser } from '../../common/auth/AuthContext';
import { useContextApi } from '../ApiContext';

export const useProfile = <T extends UserProfile>() => {
  // context
  const api = useContextApi();
  const user = useContextUser();
  // state
  const [profile, setProfile] = React.useState<WithId<T> | null>();
  // side effects
  // when uid changes
  React.useEffect(() => {
    if (!user?.uid) return;
    return api.getProfile().observeProfile(user.uid, setProfile);
  }, [api, user?.uid]);
  // when profile changes
  // console.log('profile', user?.uid, profile);
  React.useEffect(() => {
    if (profile === null) {
      if (user?.uid) {
        // create profile if non existent
        console.info('Criando perfil...');
        api
          .getProfile()
          .createProfile(user.uid)
          .then(() => null)
          .catch(console.error); // TODO: report
      }
    }
  }, [api, user?.uid, profile]);
  // result
  return profile;
};
