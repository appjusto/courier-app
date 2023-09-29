import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getDownloadURL } from './getDownloadURL';
import { putFile } from './putFile';

export const useStorageFile = (path?: string | null) => {
  // state
  const [loading, setLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<string | null>();
  // helpers
  const fetchDownloadURL = useCallback(
    async function fetchURL(keep: boolean) {
      if (!path) return;
      let timeout: NodeJS.Timeout;
      try {
        setLoading(true);
        setDownloadURL(await getDownloadURL(path));
        setLoading(false);
      } catch (error: any) {
        console.log('not found', keep);
        if (keep) timeout = setTimeout(() => fetchURL(true), 1000);
        else setLoading(false);
        console.log(error);
        setDownloadURL(null);
      }
      return () => clearTimeout(timeout);
    },
    [path]
  );
  // side effects
  useFocusEffect(
    useCallback(() => {
      fetchDownloadURL(false).then(null).catch(console.error);
    }, [fetchDownloadURL])
  );
  // result
  const upload = useCallback(
    async (localPath: string) => {
      if (!path) return;
      setLoading(true);
      await putFile(localPath, path);
      setLoading(false);
      fetchDownloadURL(true).then(null).catch(console.error);
    },
    [path, fetchDownloadURL]
  );
  return {
    loading,
    downloadURL,
    upload,
  };
};
