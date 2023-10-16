import { useContextApi } from '@/api/ApiContext';
import ProfileImage from './profile-image';

interface Props {
  size?: number;
}

export default function Selfie({ size = 60 }: Props) {
  // context
  const api = useContextApi();
  const path = api.profile().getSelfiePath('160');
  // UI
  return <ProfileImage path={path} size={size} />;
}
