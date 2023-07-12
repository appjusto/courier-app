import { router, useSegments } from 'expo-router';
import React from 'react';

// https://docs.expo.dev/router/reference/authentication/

interface U {}

interface T {
  signIn: () => void;
  signOut: () => void;
  user: U | null;
}

const AuthContext = React.createContext<T | null>(null);

export function useAuth() {
  return React.useContext(AuthContext) as T;
}

function useProtectedRoute(user: U | null) {
  const segments = useSegments();

  React.useEffect(() => {
    const restricted = segments[0] === '(logged)';
    console.log(user, segments, restricted);

    if (restricted) {
      if (!user) router.replace('/sign-in');
    }
  }, [user, segments]);
}

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
