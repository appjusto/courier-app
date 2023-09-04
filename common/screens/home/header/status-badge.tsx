import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors, { ColorName } from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { AlertOctagon, CheckCircle2, XCircle } from 'lucide-react-native';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface Props extends ViewProps {}

export const ProfileStatusBadge = ({ style, ...props }: Props) => {
  // context
  const profile = useContextProfile();
  // UI
  if (!profile) return null;
  const { situation, status } = profile;
  const backgroundColor = () => {
    if (situation === 'blocked') return colors.error500;
    if (status === 'inactive') return colors.warning900;
    if (status === 'unavailable') return colors.neutral200;
    return colors.black;
  };
  const icon = () => {
    if (situation === 'blocked') return <XCircle size={16} color={colors.white} />;
    if (status === 'inactive') return <AlertOctagon size={16} color={colors.white} />;
    if (status === 'unavailable') return <AlertOctagon size={16} color={colors.neutral600} />;
    return <CheckCircle2 size={16} color={colors.white} />;
  };
  const textColor = () => {
    if (status === 'unavailable') return 'neutral700' as ColorName;
    return 'white' as ColorName;
  };
  const text = () => {
    if (situation === 'blocked') return 'Bloqueado';
    if (status === 'inactive') return 'Desativado';
    if (status === 'unavailable') return 'Indisponível';
    return 'Disponível';
  };
  return (
    <View
      style={[
        {
          paddingHorizontal: paddings.sm,
          paddingVertical: paddings.xs,
          backgroundColor: backgroundColor(),
          borderRadius: 100,
          flexDirection: 'row',
        },
        style,
      ]}
      {...props}
    >
      {icon()}
      <DefaultText style={{ marginLeft: paddings.xs }} color={textColor()}>
        {text()}
      </DefaultText>
    </View>
  );
};
