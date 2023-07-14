import { UserProfile } from '@appjusto/types';
import React from 'react';
import { useProfile } from './useProfile';

const ProfileContext = React.createContext<UserProfile | null | undefined>(undefined);

interface Props {
  profile: UserProfile;
  children: React.ReactNode;
}

export const ProfileContextProvider = (props: Props) => {
  // state
  const profile = useProfile();
  // result
  return <ProfileContext.Provider value={profile}>{props.children}</ProfileContext.Provider>;
};

export const useContextProfile = () => {
  return React.useContext(ProfileContext);
};
