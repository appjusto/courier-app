import { useProfile } from '@/api/profile/useProfile';
import { Loading } from '@/common/components/views/Loading';
import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function LoggedIndex() {
  // context
  // state
  const profile = useProfile();
  const situation = profile?.situation;
  // side effects
  useEffect(() => {
    // console.log('situation', situation);
    if (!situation) return;
    if (situation === 'approved') {
      router.replace('/home');
    } else if (situation === 'pending') {
      router.replace('/pending');
    } else if (situation === 'submitted' || situation === 'verified') {
      router.replace('/submitted');
    }
  }, [situation]);
  // UI
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Loading />
    </View>
  );
}
