import { useContextApi } from '@/api/ApiContext';
import { useContextUserId } from '@/common/auth/AuthContext';
import { CircledView } from '@/common/components/containers/CircledView';
import { Loading } from '@/common/components/views/Loading';
import { Image } from 'expo-image';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

interface Props {
  size?: number;
}

export default function Selfie({ size = 60 }: Props) {
  // context
  const api = useContextApi();
  const courierId = useContextUserId();
  // state
  const [selfieUrl, setSelfieUrl] = useState<string | null>();
  // helpers
  const fetchSelfie = useCallback(async () => {
    if (!courierId) return;
    try {
      return await api.profile().getSelfieDownloadURL(courierId, '160x160');
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
      <CircledView size={size} style={{ borderWidth: 0 }}>
        {selfieUrl ? (
          <Image
            style={{ width: size, height: size }}
            source={{ uri: selfieUrl }}
            contentFit="cover"
          />
        ) : (
          <Loading size="small" />
        )}
      </CircledView>
    </View>
  );
}
