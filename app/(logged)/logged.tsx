import { useContextProfile } from '@/common/auth/AuthContext';
import { Loading } from '@/common/components/views/Loading';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function LoggedIndex() {
  // context
  const profile = useContextProfile();
  // state
  const [situation, setSituation] = useState(profile?.situation);
  // side effects
  useEffect(() => {
    if (profile?.situation !== situation) setSituation(profile?.situation);
  }, [profile, situation]);
  useEffect(() => {
    if (!situation) return;
    console.log('router replace:', situation);
    if (situation === 'approved') {
      router.replace('/home');
      // router.replace('/f/appjusto');
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
