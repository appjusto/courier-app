import { useContextApi } from '@/api/ApiContext';
import { useContextProfile } from '@/common/auth/AuthContext';
import { CircledView } from '@/common/components/containers/CircledView';
import { Loading } from '@/common/components/views/Loading';
import { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';

interface Props {
  size?: number;
}

export default function Selfie({ size = 60 }: Props) {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const courierId = profile?.id;
  // state
  const [selfieUrl, setSelfieUrl] = useState<string | null>();
  // helpers
  const fetchSelfie = useCallback(async () => {
    if (!courierId) return;
    try {
      return await api.getProfile().getSelfieDownloadURL(courierId, '160x160');
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }, [api, courierId]);
  // side effects
  useEffect(() => {
    fetchSelfie()
      .then(setSelfieUrl)
      .catch((error) => {
        console.log(error);
      });
  }, [fetchSelfie]);
  // UI
  return (
    <View style={{ flexDirection: 'row' }}>
      <CircledView size={60} style={{ borderWidth: 0 }}>
        {selfieUrl ? (
          <Image
            style={{ width: size, height: size }}
            resizeMode="cover"
            source={{ uri: selfieUrl }}
          />
        ) : (
          <Loading size="small" />
        )}
      </CircledView>
    </View>
  );
}
