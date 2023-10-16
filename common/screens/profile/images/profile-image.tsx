import { getDownloadURL } from '@/api/storage/getDownloadURL';
import { CircledView } from '@/common/components/containers/CircledView';
import { Loading } from '@/common/components/views/Loading';
import { Image } from 'expo-image';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

interface Props {
  path?: string | null;
  size?: number;
}

export default function ProfileImage({ path, size = 60 }: Props) {
  // state
  const [url, setURL] = useState<string | null>();
  // helpers
  const fetchDownloadURL = useCallback(async () => {
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
    fetchDownloadURL()
      .then(setURL)
      .catch((error) => {
        console.log(error);
      });
  }, [fetchDownloadURL]);
  // UI
  return (
    <View style={{ flexDirection: 'row' }}>
      <CircledView size={size} style={{ borderWidth: 0 }}>
        {url ? (
          <Image style={{ width: size, height: size }} source={{ uri: url }} contentFit="cover" />
        ) : (
          <Loading size="small" />
        )}
      </CircledView>
    </View>
  );
}
