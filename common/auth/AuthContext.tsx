import { useContextApi } from '@/api/ApiContext';
import { useProtectedRoute } from '@/common/auth/useProtectedRoute';
import { CourierProfile, WithId } from '@appjusto/types';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { useUser } from './useUser';

const AuthContext = React.createContext<Value | undefined>(undefined);

interface Value {
  user: FirebaseAuthTypes.User | null | undefined;
  userId: string | undefined;
  profile: WithId<CourierProfile> | undefined | null;
}

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = (props: Props) => {
  // context
  const api = useContextApi();
  // state
  const user = useUser();
  const userId = user?.uid;
  const [profile, setProfile] = useState<WithId<CourierProfile> | null>();
  // console.log('userId', userId);
  // console.log('profile', profile);
  // side effects
  useProtectedRoute(user);
  useEffect(() => {
    if (!userId) return;
    return api.getProfile().observeProfile<CourierProfile>(userId, setProfile);
  }, [api, userId]);
  useEffect(() => {
    if (user === null) setProfile(null);
  }, [user]);
  // result
  const value: Value = { user, userId, profile };
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export const useContextUser = () => {
  return React.useContext(AuthContext)?.user;
};

export const useContextUserId = () => {
  return React.useContext(AuthContext)?.userId;
};

export const useContextProfile = () => {
  return React.useContext(AuthContext)?.profile;
};
