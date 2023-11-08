import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultCard } from '@/common/components/views/cards/default-card';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import paddings from '@/common/styles/paddings';
import { router } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const AvailableChatCard = ({ style, ...props }: Props) => {
  // context
  const profile = useContextProfile();
  // UI
  if (profile?.tags?.includes('chat-off')) return null;
  return (
    <View style={[{ marginBottom: paddings.sm }, style]} {...props}>
      <Pressable onPress={() => router.push('/chat/available')}>
        <DefaultCard
          icon={<DefaultCardIcon iconName="chat-messages" />}
          title="Chat appjusto"
          subtitle="Converse com quem também está disponível agora"
        />
      </Pressable>
    </View>
  );
};
