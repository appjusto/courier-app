import { useAuth } from '@/auth/context/auth-context';
import { Text, View } from 'react-native';

export default function SignIn() {
  const { signIn } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => signIn()}>Sign In</Text>
    </View>
  );
}
