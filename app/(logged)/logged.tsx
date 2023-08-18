import { useProfile } from '@/api/profile/useProfile';
import { Loading } from '@/common/components/views/Loading';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function LoggedIndex() {
  // context
  const router = useRouter();
  // state
  const profile = useProfile();
  const situation = profile?.situation;
  // side effects
  useEffect(() => {
    if (!situation) return;
    if (situation === 'approved') {
      router.replace('/home');
    } else if (situation === 'pending') {
      router.replace('/pending');
    }
  }, [situation, router]);
  // UI
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Loading />
    </View>
  );
}
