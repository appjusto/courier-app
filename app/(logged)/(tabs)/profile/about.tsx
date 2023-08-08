import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { ArrowRightIcon } from '@/common/components/lists/icons/ArrowRightIcon';
import { DefaultScrollView } from '@/common/components/views/DefaultScrollView';
import screens from '@/common/constants/screens';
import { Stack, useRouter } from 'expo-router';

export default function Profile() {
  // context
  const router = useRouter();
  // UI
  return (
    <DefaultScrollView style={{ ...screens.profile }}>
      <Stack.Screen options={{ title: 'Sobre o AppJusto' }} />
      <DefaultListItem
        title="Como funciona o AppJusto"
        subtitles={[
          'Aprovação, pagamento, frotas, bloqueios, segurança e tudo mais que você precisa saber',
        ]}
        rightView={<ArrowRightIcon />}
        onPress={() => router.push('/profile/howitworks/')}
      />
    </DefaultScrollView>
  );
}
