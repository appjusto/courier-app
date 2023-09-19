import { useContextProfile } from '@/common/auth/AuthContext';
import { Loading } from '@/common/components/views/Loading';
import { Stack, router, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function LoggedIndex() {
  // context
  const profile = useContextProfile();
  const situation = profile?.situation;
  const segments = useSegments();
  // side effects
  useEffect(() => {
    if (!situation) return;
    if (!segments) return;
    // console.log('useEffect situation', situation, segments);

    if (situation === 'approved') {
      if (segments[1] === 'logged') {
        // console.log('replace home');
        router.replace('/home');
      }
      // router.replace('/f/appjusto');
    } else if (situation === 'pending') {
      router.replace('/pending');
    } else if (situation === 'submitted' || situation === 'verified') {
      router.replace('/submitted');
    }
  }, [situation, segments]);
  // UI
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Loading />
    </View>
  );
}
