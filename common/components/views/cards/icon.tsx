import { HelmetIcon } from '@/common/icons/helmet';
import colors from '@/common/styles/colors';
import {
  AlertOctagon,
  BadgeCheck,
  BadgeX,
  CircleDollarSign,
  FileText,
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
  | 'file'
  | 'chat'
  | 'helmet'
  | 'alert';

type Variant = 'lighter' | 'darker' | 'dark' | 'warning';
interface Props {
  iconName: IconName;
  variant?: Variant;
}

const size = 50;
const iconSize = 24;

const getIcon = (name: IconName, variant?: Variant) => {
  let color = colors.primary500;
  if (variant === 'darker') color = colors.primary900;
  else if (variant === 'dark') color = colors.black;
  else if (variant === 'warning') color = colors.warning500;

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
  if (name === 'file') {
    return <FileText size={iconSize} color={color} />;
  }
  if (name === 'chat') {
    return <MessageCircle size={iconSize} color={color} />;
  }
  if (name === 'alert') {
    return <AlertOctagon size={iconSize} color={color} />;
  }
  if (name === 'helmet') {
    return <HelmetIcon />;
  }
  return null;
};

export const DefaultCardIcon = ({ iconName, variant = 'lighter' }: Props) => {
  // UI
  let backgroundColor = colors.primary100;
  if (variant === 'darker') backgroundColor = colors.primary300;
  else if (variant === 'dark') backgroundColor = colors.primary300;
  else if (variant === 'warning') backgroundColor = colors.warning100;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {getIcon(iconName, variant)}
    </View>
  );
};
