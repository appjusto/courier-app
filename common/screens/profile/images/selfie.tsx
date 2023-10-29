import { useContextApi } from '@/api/ApiContext';
import { View, ViewProps } from 'react-native';
import ProfileImage from './profile-image';

interface Props extends ViewProps {
  courierId?: string;
  size?: number;
}

export default function Selfie({ courierId, size = 40, style, ...props }: Props) {
  // context
  const api = useContextApi();
  const path = api.profile().getSelfiePath('160', courierId);
  // UI
  return (
    <View style={[{}, style]} {...props}>
      <ProfileImage path={path} size={size} />
    </View>
  );
}
