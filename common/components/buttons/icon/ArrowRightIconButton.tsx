import colors from '@/common/styles/colors';
import { ArrowRight } from 'lucide-react-native';
import { OnlyIconButton } from './OnlyIconButton';

interface Props {
  variant?: 'default' | 'circle';
  onPress: () => void;
}

export const ArrowRightIconButton = ({ onPress, variant }: Props) => (
  <OnlyIconButton icon={<ArrowRight color={colors.black} />} onPress={onPress} variant={variant} />
);
