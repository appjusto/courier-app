import { useContextApi } from '@/api/ApiContext';
import ProfileImage from './profile-image';

interface Props {
  courierId?: string;
  size?: number;
}

export default function Selfie({ courierId, size = 40 }: Props) {
  // context
  const api = useContextApi();
  const path = api.profile().getSelfiePath('160', courierId);
  // UI
  return <ProfileImage path={path} size={size} />;
}
