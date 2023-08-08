import { DefaultText } from '@/common/components/texts/DefaultText';
import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function Welcome() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Link href="/howitworks" asChild> */}
      {/* <Link href="/profile/" asChild> */}
      <Link href="/profile" asChild>
        <Pressable>
          <DefaultText size="2xl">Entrar!</DefaultText>
        </Pressable>
      </Link>
    </View>
  );
}
