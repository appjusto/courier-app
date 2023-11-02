import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { CircledView } from '@/common/components/containers/CircledView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultCard } from '@/common/components/views/cards/default-card';
import { DefaultCardIcon, IconName } from '@/common/components/views/cards/icon';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  title: string;
  iconName: IconName;
  hasUnreadMessages: boolean;
}

export const ChatCard = ({ title, iconName, hasUnreadMessages, style, ...props }: Props) => {
  return (
    <DefaultCard
      style={[
        {
          backgroundColor: hasUnreadMessages ? colors.primary100 : colors.white,
          borderColor: hasUnreadMessages ? colors.primary300 : colors.neutral100,
        },
        style,
      ]}
      {...props}
      icon={
        <View>
          <DefaultCardIcon iconName={iconName} variant={hasUnreadMessages ? 'white' : 'lighter'} />
          {hasUnreadMessages ? (
            <CircledView
              style={{
                position: 'absolute',
                right: 5,
                top: 5,
                backgroundColor: colors.primary500,
                borderColor: colors.primary500,
              }}
              size={8}
            />
          ) : null}
        </View>
      }
      title={title}
    />
  );
};

export default function ChatPickerScreen() {
  // params
  const params = useLocalSearchParams<{
    id: string;
    consumerId: string;
    businessId: string;
    hasUnreadMessagesFromConsumer: string;
    hasUnreadMessagesFromBusiness: string;
  }>();
  const { id: orderId, consumerId, businessId } = params;
  const hasUnreadMessagesFromConsumer = params.hasUnreadMessagesFromConsumer === 'true';
  const hasUnreadMessagesFromBusiness = params.hasUnreadMessagesFromConsumer === 'true';
  useTrackScreenView('Escolher Chat');
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
          <ChatCard
            title="Chat com consumidor"
            iconName="fleets"
            hasUnreadMessages={hasUnreadMessagesFromConsumer}
          />
        )}
      </Pressable>
      <Pressable onPress={() => openChat(businessId)}>
        {() => (
          <ChatCard
            style={{ marginTop: paddings.lg }}
            title="Chat com restaurante"
            iconName="utentils"
            hasUnreadMessages={hasUnreadMessagesFromBusiness}
          />
        )}
      </Pressable>
    </DefaultView>
  );
}
