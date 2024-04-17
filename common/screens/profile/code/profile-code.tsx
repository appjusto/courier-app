import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import * as Clipboard from 'expo-clipboard';
import { Copy } from 'lucide-react-native';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const ProfileCode = ({ style, ...props }: Props) => {
  // context
  const profile = useContextProfile();
  const showToast = useShowToast();
  if (!profile) return null;
  // UI
  return (
    <View style={[{}, style]} {...props}>
      <Pressable
        onPress={() =>
          Clipboard.setStringAsync(profile.code).then(() => {
            showToast('Código copiado!', 'success');
          })
        }
      >
        <View
          style={{
            marginTop: paddings.lg,
            padding: paddings.lg,
            backgroundColor: colors.primary100,
            ...borders.default,
            borderColor: colors.primary300,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <DefaultText size="xs">Código</DefaultText>
              <DefaultText size="md" color="black">
                {profile.code}
              </DefaultText>
            </View>
            <Copy size={24} color={colors.neutral900} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
