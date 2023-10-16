import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultText } from '@/common/components/texts/DefaultText';
import paddings from '@/common/styles/paddings';
import { View } from 'react-native';
import Selfie from '../images/selfie';

export default function ProfileHeader() {
  // context
  const profile = useContextProfile();
  // UI
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Selfie />
      {profile ? (
        <DefaultText size="lg" style={{ marginLeft: paddings.md }}>
          {profile.name}
        </DefaultText>
      ) : null}
    </View>
  );
}
