import { useContextApi } from '@/api/ApiContext';
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
  console.log('userId', userId);
  console.log('profile', profile);
  // side effects
  useEffect(() => {
    if (!userId) return;
    // inAppMessaging()
    //   .setMessagesDisplaySuppressed(false)
    //   .then(() => null);
    return api.profile().observeProfile(userId, setProfile);
  }, [api, userId]);
  useEffect(() => {
    console.log('user', user);
    if (user === null) {
      setProfile(null);
    }
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

// export const useContextProfileLocation = () => {
//   const coordinates = React.useContext(AuthContext)?.profile?.coordinates;
//   if (coordinates)
//     return { latitude: coordinates.latitude, longitude: coordinates.longitude } as LatLng;
// };
