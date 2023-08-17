import colors from '@/common/styles/colors';
import { Plus } from 'lucide-react-native';
import { OnlyIconButton } from './OnlyIconButton';

interface Props {
  variant?: 'default' | 'circle';
  onPress: () => void;
}

export const PlusIconButton = ({ onPress, variant }: Props) => (
  <OnlyIconButton icon={<Plus color={colors.black} />} onPress={onPress} variant={variant} />
);
