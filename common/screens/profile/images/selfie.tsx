import { useContextApi } from '@/api/ApiContext';
import { getDownloadURL } from '@/api/storage/getDownloadURL';
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
  const path = api.profile().getSelfiePath('160');
  // state
  const [selfieUrl, setSelfieUrl] = useState<string | null>();
  // helpers
  const fetchSelfie = useCallback(async () => {
    if (!path) return;
    try {
      return await getDownloadURL(path);
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }, [path]);
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
