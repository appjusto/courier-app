import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveAvailableCouriersChat } from '@/api/chats/useObserveAvailableCouriersChat';
import { useContextLocation } from '@/api/location/context/LocationContext';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { OnlyIconButton } from '@/common/components/buttons/icon/OnlyIconButton';
import { CircledView } from '@/common/components/containers/CircledView';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedText } from '@/common/components/texts/RoundedText';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { getAppJustoURLPath } from '@/common/constants/urls';
import { handleErrorMessage } from '@/common/firebase/errors';
import { Time, formatTimestamp } from '@/common/formatters/timestamp';
import Selfie from '@/common/screens/profile/images/selfie';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import { Send } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';

const AppJustoLogo = require('../../../assets/images/icon.png');

export default function AvailableCouriersChatScreen() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  const profile = useContextProfile();
  const location = useContextLocation();
  const courierId = profile?.id;
  const status = profile?.status;
  const available = status === 'available';
  // state
  const chat = useObserveAvailableCouriersChat(available);
  const [message, setMessage] = useState('');
  // tracking
  useTrackScreenView('Chat entregadores online');
  // handlers
  const toggleWorking = () => {
    if (!profile) return;
    if (status === 'available') return;
    if (status === 'inactive') return;
    if (status === 'dispatching') {
      showToast('Você precisa finalizar a entrega para utilizar o chat público.', 'warning');
      return;
    }
    trackEvent('Ficou disponível');
    api
      .profile()
      .updateProfile({ status: 'available' })
      .catch((error) => {
        const message = handleErrorMessage(error);
        showToast(message, 'error');
      });
  };
  const sendMessage = () => {
    if (!profile?.name) return;
    setMessage('');
    api.chat().sendPublicMessage(message, profile.name, location).catch(console.error);
  };
  // UI
  return (
    <DefaultKeyboardAwareScrollView>
      <Stack.Screen options={{ title: 'Chat geral' }} />
      {!available ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: paddings.xl,
          }}
        >
          <View style={{ flex: 1 }} />
          <DefaultCardIcon iconName="chat-messages" iconSize={80} />
          <DefaultText style={{ marginTop: paddings.lg, textAlign: 'center' }} size="lg">
            Saiba onde os pedidos estão tocando e converse com quem também está disponível
          </DefaultText>
          <DefaultText style={{ marginTop: paddings.lg, textAlign: 'center' }} size="md">
            Fique disponível para acessar este chat
          </DefaultText>
          <View
            style={{
              marginTop: paddings.xl,
              padding: paddings.lg,
              ...borders.default,
              borderColor: colors.neutral100,
            }}
          >
            <DefaultText color="black">Principais recursos</DefaultText>
            <DefaultText
              style={{ marginTop: paddings.md, ...lineHeight.xs }}
              size="xs"
              color="neutral800"
            >{`\u00B7 Saber onde os pedidos estão tocando\n\u00B7 Convidar outras pessoas para entrar na sua frota\n\u00B7 Fazer contatos e fortalecer a categoria`}</DefaultText>
            <RoundedText
              style={{ marginTop: paddings.md, backgroundColor: colors.info100 }}
              size="xs"
              color="info900"
            >
              Mensagens disponíveis até 4 horas após envio
            </RoundedText>
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ width: '100%' }}>
            <DefaultButton onPress={toggleWorking} title="Ficar disponível" />
          </View>
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
          <View style={{ padding: paddings.lg, paddingRight: paddings.xl }}>
            {chat
              ? chat.map((group) => {
                  console.log('group', group.id);
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: group.from === courierId ? 'flex-end' : 'flex-start',
                      }}
                      key={group.id}
                    >
                      <View>
                        {group.from === 'platform' ? (
                          <CircledView size={40} style={{ marginTop: 0, borderWidth: 0 }}>
                            <Image
                              style={{ width: 40, height: 40 }}
                              source={AppJustoLogo}
                              contentFit="cover"
                            />
                          </CircledView>
                        ) : group.from !== courierId ? (
                          <Selfie size={40} courierId={courierId} />
                        ) : null}
                      </View>
                      <View style={{}}>
                        {group.messages.map((message) => {
                          const path = getAppJustoURLPath(message.message);
                          return (
                            <Pressable
                              key={message.id}
                              onPress={() => {
                                if (path) {
                                  console.log(path);
                                  router.push(path as `https://`);
                                }
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
                                        textDecorationLine: path ? 'underline' : undefined,
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
