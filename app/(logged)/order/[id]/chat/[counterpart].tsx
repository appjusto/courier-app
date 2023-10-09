import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { unreadMessages } from '@/api/chats/unreadMessages';
import { useObserveChat } from '@/api/chats/useObserveOrderChat';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { useContextProfile } from '@/common/auth/AuthContext';
import { OnlyIconButton } from '@/common/components/buttons/icon/OnlyIconButton';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { Time, formatTimestamp } from '@/common/formatters/timestamp';
import Selfie from '@/common/screens/profile/images/selfie';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Flavor } from '@appjusto/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Send, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ChatScreen() {
  // context
  const api = useContextApi();
  const courier = useContextProfile();
  const courierId = courier?.id;
  // params
  const params = useLocalSearchParams<{ id: string; counterpart: string }>();
  const orderId = params.id;
  const counterpartId = params.counterpart;
  // state
  const order = useObserveOrder(orderId);
  const chat = useObserveChat(orderId, counterpartId);
  const unread = unreadMessages(chat);
  const [message, setMessage] = useState('');
  const counterpartFlavor = (): Flavor => {
    if (counterpartId === order?.consumer.id) return 'consumer';
    return 'business';
  };
  const counterpartName = () => {
    if (!order) return '';
    if (counterpartId === order.consumer.id) return order.consumer.name;
    return order.business?.name ?? '';
  };
  // tracking
  useTrackScreenView('Chat');
  // side effects
  useEffect(() => {
    if (!unread?.length) return;
    api
      .chat()
      .updateReadMessages(unread.map((message) => message.id))
      .catch((error: unknown) => {
        console.error(error);
      });
  }, [api, unread]);
  // handlers
  const sendMessage = () => {
    if (!courierId) return;
    if (!order) return;
    setMessage('');
    api
      .chat()
      .sendMessage({
        type: counterpartId === order.consumer.id ? 'consumer-courier' : 'business-courier',
        participantsIds: [counterpartId, courierId], // order matters
        from: {
          agent: 'courier',
          id: courierId,
          name: courier.name,
        },
        to: {
          agent: counterpartFlavor(),
          id: counterpartId,
          name: counterpartName(),
        },
        message: message.trim(),
        orderId,
        orderStatus: order.status,
        orderCode: order.code,
      })
      .catch(console.error);
  };
  if (!order) return <Loading title="Chat" />;
  // console.log(JSON.stringify(chat));
  // UI
  return (
    <KeyboardAwareScrollView
      style={{ ...screens.default }}
      enableOnAndroid
      enableAutomaticScroll
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <DefaultView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: colors.neutral50,
        }}
      >
        <Stack.Screen options={{ title: `Chat com ${order.consumer.name}` }} />
        <View style={{ padding: paddings.lg }}>
          {chat
            ? chat.map((group) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: group.from === counterpartId ? 'flex-start' : 'flex-end',
                  }}
                  key={group.id}
                >
                  <View>{group.from === counterpartId ? <User /> : null}</View>
                  <View style={{}}>
                    {group.messages.map((message) => (
                      <View
                        style={{
                          // borderWidth: 1,
                          flexDirection: 'row',
                          justifyContent: group.from === counterpartId ? 'flex-start' : 'flex-end',
                          marginHorizontal: paddings.md,
                          marginBottom: paddings.sm,
                        }}
                        key={message.id}
                      >
                        <View
                          style={{
                            padding: paddings.md,

                            ...borders.default,
                            backgroundColor:
                              group.from === counterpartId ? colors.white : colors.primary100,
                            borderColor:
                              group.from === counterpartId ? colors.neutral100 : colors.primary300,
                          }}
                        >
                          <View style={{}}>
                            <DefaultText style={{}} color="neutral900">
                              {message.message}
                            </DefaultText>
                            <DefaultText style={{ alignSelf: 'flex-end' }} size="xxs">
                              {message.timestamp ? formatTimestamp(message.timestamp, Time) : ''}
                            </DefaultText>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View>{group.from === courierId ? <Selfie size={40} /> : null}</View>
                </View>
              ))
            : null}
        </View>
        <SafeAreaView>
          <View
            style={{
              padding: paddings.lg,
              marginBottom: paddings.lg,
              backgroundColor: colors.white,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <DefaultInput
                placeholder="Escreva sua mensagem"
                value={message}
                onChangeText={setMessage}
              />
            </View>
            <OnlyIconButton
              style={{ marginLeft: paddings.sm }}
              iconStyle={{ backgroundColor: colors.black }}
              icon={<Send color={colors.white} />}
              onPress={sendMessage}
            />
          </View>
        </SafeAreaView>
      </DefaultView>
    </KeyboardAwareScrollView>
  );
}
