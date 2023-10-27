import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveAvailableCouriersChat } from '@/api/chats/useObserveAvailableCouriersChat';
import { useContextProfile } from '@/common/auth/AuthContext';
import { OnlyIconButton } from '@/common/components/buttons/icon/OnlyIconButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Time, formatTimestamp } from '@/common/formatters/timestamp';
import Selfie from '@/common/screens/profile/images/selfie';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Stack, router } from 'expo-router';
import { Send } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';

export default function AvailableCouriersChatScreen() {
  // context
  const api = useContextApi();
  const courier = useContextProfile();
  const courierId = courier?.id;
  const available = courier?.status === 'available';
  // state
  const chat = useObserveAvailableCouriersChat(available);
  const [message, setMessage] = useState('');
  // tracking
  useTrackScreenView('Chat entregadores online');
  // handlers
  const sendMessage = () => {
    if (!courierId) return;
    setMessage('');
    api
      .chat()
      .sendMessage({
        type: 'available-couriers',
        from: {
          agent: 'courier',
          id: courierId,
          name: courier.name,
        },
        message: message.trim(),
      })
      .catch(console.error);
  };
  // UI
  return (
    <DefaultKeyboardAwareScrollView>
      <Stack.Screen options={{ title: 'Chat geral' }} />
      {!available ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <DefaultText>Fique ativo para usar o chat</DefaultText>
        </View>
      ) : null}

      {available ? (
        <DefaultView
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: colors.neutral50,
          }}
        >
          <View style={{ padding: paddings.lg }}>
            {chat
              ? chat.map((group) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: group.from === courierId ? 'flex-end' : 'flex-start',
                      }}
                      key={group.id}
                    >
                      <View>
                        {group.from !== courierId ? (
                          <Selfie size={40} courierId={courierId} />
                        ) : null}
                      </View>
                      <View style={{}}>
                        {group.messages.map((message) => {
                          const link = /https:\/\/appjusto.com.br\/(.+)/.exec(message.message);
                          const isLink = Boolean(link);
                          return (
                            <Pressable
                              onPress={() => {
                                if (link && link[1]) router.push(link[1] as `https://`);
                              }}
                            >
                              <View
                                style={{
                                  // borderWidth: 1,
                                  flexDirection: 'row',
                                  justifyContent:
                                    group.from === courierId ? 'flex-end' : 'flex-start',
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
                                      group.from === courierId ? colors.primary100 : colors.white,
                                    borderColor:
                                      group.from === courierId
                                        ? colors.primary300
                                        : colors.neutral100,
                                  }}
                                >
                                  <View style={{}}>
                                    <DefaultText
                                      style={{
                                        textDecorationLine: isLink ? 'underline' : undefined,
                                      }}
                                      color="neutral900"
                                    >
                                      {message.message}
                                    </DefaultText>
                                    <DefaultText style={{ alignSelf: 'flex-end' }} size="xxs">
                                      {message.timestamp
                                        ? formatTimestamp(message.timestamp, Time)
                                        : ''}
                                    </DefaultText>
                                  </View>
                                </View>
                              </View>
                            </Pressable>
                          );
                        })}
                      </View>
                      <View>{group.from === courierId ? <Selfie size={40} /> : null}</View>
                    </View>
                  );
                })
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
                  autoCorrect={false}
                  autoCapitalize="none"
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
      ) : null}
    </DefaultKeyboardAwareScrollView>
  );
}
