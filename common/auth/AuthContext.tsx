import { useProtectedRoute } from '@/common/auth/useProtectedRoute';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React from 'react';
import { useUser } from './useUser';

const AuthContext = React.createContext<
  FirebaseAuthTypes.User | null | undefined
>(undefined);

interface Props {
  user?: FirebaseAuthTypes.User;
  children: React.ReactNode;
}

export const AuthProvider = (props: Props) => {
  // state
  const user = useUser();
  useProtectedRoute(user);
  // side effects
  // result
  return (
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};

export const useContextUser = () => {
  return React.useContext(AuthContext);
};
