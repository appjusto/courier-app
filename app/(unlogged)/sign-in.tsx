import { useAuth } from '@/auth/context/auth-context';
import { DefaultText } from '@/common/expo/components/texts/DefaultText';
import { View } from 'react-native';

export default function SignIn() {
  const { signIn } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DefaultText onPress={() => signIn()}>Sign In</DefaultText>
    </View>
  );
}
