import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React from 'react';
import { useContextApi } from '../../api/ApiContext';

export const useUser = () => {
  // context
  const api = useContextApi();
  // state
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>();
  // side effects
  // once
  React.useEffect(() => {
    return api.auth().observeAuthState(setUser);
  }, [api]);
  // result
  return user;
};
