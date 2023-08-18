import { DefaultText } from '@/common/components/texts/DefaultText';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function PendingIndex() {
  return (
    <View style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Cadastro' }} />
      <DefaultText>Pending</DefaultText>
    </View>
  );
}
