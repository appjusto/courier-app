import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { Loading } from '@/common/components/views/Loading';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { URL_APPJUSTO_WHATSAPP } from '@/common/constants/urls';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Linking, Pressable, View } from 'react-native';

export default function OrderSupportScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const order = useObserveOrder(orderId);
  const businessId = order?.business?.id;
  // UI
  if (!order) return <Loading title="Ajuda com a corrida" />;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Ajuda com a corrida' }} />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.neutral50,
          paddingVertical: paddings.xl,
          paddingHorizontal: paddings.lg,
        }}
      >
        <Pressable onPress={() => null}>
          {() => (
            <DefaultCard
              icon={<DefaultCardIcon iconName="cancel" variant="warning" />}
              title="Desistir da corrida"
              subtitle="Você pode desistir da corrida até coletar o pedido"
            />
          )}
        </Pressable>
        <Pressable onPress={() => null}>
          {() => (
            <DefaultCard
              style={{ marginTop: paddings.lg }}
              icon={<DefaultCardIcon iconName="alert" variant="warning" />}
              title="Tive um problema"
              subtitle="Abrir uma ocrrência para relatar algum problema durante a corrida"
            />
          )}
        </Pressable>
        {businessId ? (
          <Pressable
            onPress={() => {
              router.push({
                pathname: '/(logged)/order/[id]/chat/[counterpart]',
                params: { id: orderId, counterpart: businessId },
              });
            }}
          >
            {() => (
              <DefaultCard
                style={{ marginTop: paddings.lg }}
                icon={<DefaultCardIcon iconName="chat" variant="warning" />}
                title="Preciso falar com o restaurante"
                subtitle="Abrir chat direto com o restaurante"
              />
            )}
          </Pressable>
        ) : null}
        <Pressable onPress={() => Linking.openURL(URL_APPJUSTO_WHATSAPP)}>
          {() => (
            <DefaultCard
              style={{ marginTop: paddings.lg }}
              icon={<DefaultCardIcon iconName="chat" variant="warning" />}
              title="Preciso falar com o AppJusto"
              subtitle="Fale com a gente através do nosso WhatsApp"
            />
          )}
        </Pressable>
      </View>
    </DefaultScrollView>
  );
}
