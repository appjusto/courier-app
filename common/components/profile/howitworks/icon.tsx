import colors from '@/common/styles/colors';
import {
  BadgeCheck,
  BadgeX,
  CircleDollarSign,
  HelpCircle,
  ShieldCheck,
  Smartphone,
  Users2,
} from 'lucide-react-native';
import { View } from 'react-native';

type IconName = 'approval' | 'revenue' | 'fleets' | 'blocks' | 'safety' | 'help' | 'smartphone';

interface Props {
  iconName: IconName;
}

const size = 50;
const iconSize = 24;

const getIcon = (name: IconName) => {
  if (name === 'approval') {
    return <BadgeCheck size={iconSize} color={colors.primary500} />;
  }
  if (name === 'revenue') {
    return <CircleDollarSign size={iconSize} color={colors.primary500} />;
  }
  if (name === 'fleets') {
    return <Users2 size={iconSize} color={colors.primary500} />;
  }
  if (name === 'blocks') {
    return <BadgeX size={iconSize} color={colors.primary500} />;
  }
  if (name === 'safety') {
    return <ShieldCheck size={iconSize} color={colors.primary500} />;
  }
  if (name === 'help') {
    return <HelpCircle size={iconSize} color={colors.primary500} />;
  }
  if (name === 'smartphone') {
    return <Smartphone size={iconSize} color={colors.primary500} />;
  }
  return null;
};

export const HowItWorksIcon = ({ iconName }: Props) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.primary100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {getIcon(iconName)}
    </View>
  );
};
