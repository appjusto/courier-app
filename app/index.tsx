import { DefaultText } from '@/common/components/texts/DefaultText';
import { Link } from 'expo-router';
import { Camera } from 'lucide-react-native';
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
      <View>
        <Camera color="red" size={48} />
      </View>
    </View>
  );
}
