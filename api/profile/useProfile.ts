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
    if (user === null) {
      setProfile(undefined);
    }
    if (!user?.uid) return;
    return api.getProfile().observeProfile(user.uid, setProfile);
  }, [api, user]);
  // when profile changes
  React.useEffect(() => {
    if (!user) return;
    if (profile === null) {
      if (user.uid) {
        // create profile if non existent
        console.info('Criando perfil...');
        api
          .getProfile()
          .createProfile(user.uid)
          .then(() => null)
          .catch(console.error); // TODO: report
      }
    }
  }, [api, user, profile]);
  // result
  // console.log('user', 'null?', user === null, 'undef?', user === undefined, user?.uid);
  // console.log('profile', 'null?', profile === null, 'undef?', profile === undefined, profile?.id);
  return profile;
};
