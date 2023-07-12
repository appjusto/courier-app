import React from 'react';
import { useProtectedRoute } from '../useProtectedRoute';

// https://docs.expo.dev/router/reference/authentication/

export interface U {}

export interface T {
  signIn: () => void;
  signOut: () => void;
  user: U | null;
}

export const AuthContext = React.createContext<T | null>(null);

interface ProvideProps {
  children?: React.ReactNode | undefined;
}

export function Provider(props: ProvideProps) {
  const [user, setAuth] = React.useState<U | null>(null);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth({}),
        signOut: () => setAuth(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
