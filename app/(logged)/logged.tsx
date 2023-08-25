import { useContextProfile } from '@/common/auth/AuthContext';
import { Loading } from '@/common/components/views/Loading';
import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function LoggedIndex() {
  // context
  // state
  const profile = useContextProfile();
  // const situation = profile?.situation;
  // side effects
  useEffect(() => {
    if (profile === undefined) return;
    if (profile === null) {
      return;
    }
    // console.log('situation', situation);
    const situation = profile.situation;
    if (situation === 'approved') {
      router.replace('/home');
    } else if (situation === 'pending') {
      router.replace('/pending');
    } else if (situation === 'submitted' || situation === 'verified') {
      router.replace('/submitted');
    }
  }, [profile]);
  // UI
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Loading />
    </View>
  );
}
