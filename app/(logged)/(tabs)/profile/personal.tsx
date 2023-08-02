import { DefaultText } from '@/common/components/texts/DefaultText';
import { DefaultScrollView } from '@/common/components/views/DefaultScrollView';
import screens from '@/common/constants/screens';
import colors from '@/common/styles/colors';
import { Stack, useRouter } from 'expo-router';

export default function ProfilePersonalData() {
  // context
  const router = useRouter();
  // UI
  return (
    <DefaultScrollView
      style={{ ...screens.default, backgroundColor: colors.gray50 }}
    >
      <Stack.Screen options={{ title: 'Dados pessoais' }} />
      <DefaultText>Seus dados</DefaultText>
    </DefaultScrollView>
  );
}
