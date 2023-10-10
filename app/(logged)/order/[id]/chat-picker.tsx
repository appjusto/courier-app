import { DefaultView } from '@/common/components/containers/DefaultView';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Pressable } from 'react-native';

export default function ChatPickerScreen() {
  // params
  const params = useLocalSearchParams<{ id: string; consumerId: string; businessId: string }>();
  const { id: orderId, consumerId, businessId } = params;
  // handlers
  const openChat = (counterpartId: string) =>
    router.replace({
      pathname: '/(logged)/order/[id]/chat/[counterpart]',
      params: { id: orderId, counterpart: counterpartId },
    });
  // UI
  return (
    <DefaultView
      style={{
        paddingHorizontal: paddings.lg,
        paddingVertical: paddings.xl,
        backgroundColor: colors.neutral50,
      }}
    >
      <Stack.Screen options={{ title: 'Chat' }} />
      <Pressable onPress={() => openChat(consumerId)}>
        {() => (
          <DefaultCard icon={<DefaultCardIcon iconName="fleets" />} title="Chat com consumidor" />
        )}
      </Pressable>
      <Pressable onPress={() => openChat(businessId)}>
        {() => (
          <DefaultCard
            style={{ marginTop: paddings.lg }}
            icon={<DefaultCardIcon iconName="utentils" />}
            title="Chat com restaurante"
          />
        )}
      </Pressable>
    </DefaultView>
  );
}
