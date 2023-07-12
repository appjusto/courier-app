import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Welcome() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/(logged)/(tabs)/two">Tab two</Link>
    </View>
  );
}
