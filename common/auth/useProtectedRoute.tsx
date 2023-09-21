import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { router, useSegments } from 'expo-router';
import { useEffect } from 'react';

export function useProtectedRoute(user: FirebaseAuthTypes.User | null | undefined) {
  // context
  const segments = useSegments();
  console.log(segments);
  // side effects
  useEffect(() => {
    const restricted = segments[0] === '(logged)';

    if (restricted) {
      if (user === null) router.replace('/sign-in');
    }
  }, [user, segments]);
}
