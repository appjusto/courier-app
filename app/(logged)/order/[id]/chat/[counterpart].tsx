import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { unreadMessagesIds } from '@/api/chats/unreadMessagesIds';
import { useObserveChat } from '@/api/chats/useObserveOrderChat';
import { useContextLocation } from '@/api/location/context/LocationContext';
import { geolocationFromLatLng } from '@/api/location/geolocationFromLatLng';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { useContextProfile } from '@/common/auth/AuthContext';
import { OnlyIconButton } from '@/common/components/buttons/icon/OnlyIconButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { Time, formatTimestamp } from '@/common/formatters/timestamp';
import { useUniqState } from '@/common/react/useUniqState';
import ProfileImage from '@/common/screens/profile/images/profile-image';
import Selfie from '@/common/screens/profile/images/selfie';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Stack, useLocalSearchParams } from 'expo-router';
import { CheckCheck, Send, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';

export default function ChatScreen() {
  // context
  const api = useContextApi();
  const courier = useContextProfile();
  const courierId = courier?.id;
  const location = useContextLocation();
  // params
  const params = useLocalSearchParams<{ id: string; counterpart: string }>();
  const orderId = params.id;
  const counterpartId = params.counterpart;
  // console.log('chat', counterpartId);
  // state
  const order = useObserveOrder(orderId);
  const counterpartFlavor = order
    ? counterpartId === order.consumer.id
      ? 'consumer'
      : 'business'
    : undefined;
  const counterpartName = order
    ? counterpartId === order.consumer.id
      ? order.consumer.name
      : order.business?.name
    : undefined;
  const chat = useObserveChat(orderId, counterpartId);
  const unread = useUniqState(unreadMessagesIds(chat, counterpartId, counterpartFlavor));
  const [message, setMessage] = useState('');
  // tracking
  useTrackScreenView('Chat', { counterpartFlavor }, Boolean(counterpartFlavor));
  // side effects
  useEffect(() => {
    if (!unread?.length) return;
    api
      .chat()
      .updateReadMessages(unread)
      .catch((error: unknown) => {
        console.error(error);
      });
  }, [api, unread]);
  // handlers
  const sendMessage = () => {
    if (!courierId) return;
    if (!order) return;
    if (!counterpartFlavor) return;
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
          agent: counterpartFlavor,
          id: counterpartId,
          name: counterpartName,
        },
        message: message.trim(),
        orderId,
        orderStatus: order.status,
        orderCode: order.code,
        ...(location ? geolocationFromLatLng(location) : {}),
      })
      .catch(console.error);
  };
  if (!order) return <Loading title="Chat" />;
  // console.log(JSON.stringify(chat));
  // UI
  return (
    <DefaultView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: counterpartName }} />
      <DefaultKeyboardAwareScrollView
        // style={{ flex: 1 }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: colors.neutral50,
        }}
      >
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
                  {/* from consumer */}
                  <View>{group.fromFlavor === 'consumer' ? <User /> : null}</View>
                  {/* business */}
                  <View>
                    {group.fromFlavor === 'business' ? (
                      <ProfileImage path={`businesses/${group.from}/logo_240x240.jpg`} />
                    ) : null}
                  </View>
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
                              group.from === counterpartId ? colors.white : colors.neutral100,
                            borderColor:
                              group.from === counterpartId ? colors.neutral100 : colors.neutral300,
                          }}
                        >
                          <View>
                            <DefaultText color="neutral900">{message.message}</DefaultText>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <DefaultText size="xxs">
                                {message.timestamp ? formatTimestamp(message.timestamp, Time) : ''}
                              </DefaultText>
                              {group.from === courierId ? (
                                <CheckCheck
                                  style={{ marginLeft: paddings.xs }}
                                  size={16}
                                  color={message.read ? colors.primary500 : colors.neutral500}
                                />
                              ) : null}
                            </View>
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
      </DefaultKeyboardAwareScrollView>
    </DefaultView>
  );
}
