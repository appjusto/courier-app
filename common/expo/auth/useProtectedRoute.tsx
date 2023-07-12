import { router, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { U } from './context/AuthContext';

export function useProtectedRoute(user: U | null) {
  const segments = useSegments();

  useEffect(() => {
    const restricted = segments[0] === '(logged)';

    if (restricted) {
      if (!user) router.replace('/sign-in');
    }
  }, [user, segments]);
}
