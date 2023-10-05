import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function WithdrawFeedbackScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const withdrawId = params.id;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Transferência solicitada' }} />
      <FeedbackHeader
        title="Solicitação de transferência enviada com sucesso!"
        text={[
          'Transferências solicitadas após horário comercial serão compensadas até às 23h59 do próximo dia útil.',
        ]}
        variant="success"
      />
      <View
        style={{
          flex: 1,
        }}
      />
      <View
        style={{
          flex: 1,
          padding: paddings.lg,
          alignItems: 'center',
        }}
      >
        <DefaultButton
          title="Ver detalhe da transferência"
          onPress={() => {
            router.replace({
              pathname: '/(logged)/(tabs)/deliveries/withdraws/[id]/',
              params: { id: withdrawId },
            });
          }}
        />
        <LinkButton
          style={{ marginTop: paddings.lg }}
          variant="ghost"
          onPress={() => router.back()}
        >
          Voltar
        </LinkButton>
      </View>
    </DefaultScrollView>
  );
}
