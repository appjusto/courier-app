import colors from '@/common/styles/colors';
import {
  BadgeCheck,
  BadgeX,
  CircleDollarSign,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Users2,
} from 'lucide-react-native';
import { View } from 'react-native';

type IconName =
  | 'approval'
  | 'revenue'
  | 'fleets'
  | 'blocks'
  | 'safety'
  | 'help'
  | 'smartphone'
  | 'chat';

interface Props {
  iconName: IconName;
  variant?: 'lighter' | 'darker';
}

const size = 50;
const iconSize = 24;

const getIcon = (name: IconName, variant?: 'lighter' | 'darker') => {
  const color = variant === 'lighter' ? colors.primary500 : colors.primary900;
  if (name === 'approval') {
    return <BadgeCheck size={iconSize} color={color} />;
  }
  if (name === 'revenue') {
    return <CircleDollarSign size={iconSize} color={color} />;
  }
  if (name === 'fleets') {
    return <Users2 size={iconSize} color={color} />;
  }
  if (name === 'blocks') {
    return <BadgeX size={iconSize} color={color} />;
  }
  if (name === 'safety') {
    return <ShieldCheck size={iconSize} color={color} />;
  }
  if (name === 'help') {
    return <HelpCircle size={iconSize} color={color} />;
  }
  if (name === 'smartphone') {
    return <Smartphone size={iconSize} color={color} />;
  }
  if (name === 'chat') {
    return <MessageCircle size={iconSize} color={color} />;
  }
  return null;
};

export const DefaultCardIcon = ({ iconName, variant = 'lighter' }: Props) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: variant === 'lighter' ? colors.primary100 : colors.primary300,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {getIcon(iconName, variant)}
    </View>
  );
};
