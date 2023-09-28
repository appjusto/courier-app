import { useContextApi } from '@/api/ApiContext';
import { useCallback, useEffect, useState } from 'react';

export const useFetchDownloadURL = (path?: string | null, autoCheck = true) => {
  // context
  const api = useContextApi();
  // state
  const [url, setURL] = useState<string | null>();
  const [checkTick, setCheckTick] = useState<number | undefined>(autoCheck ? 1 : undefined);
  // helpers
  const fetchImageURL = useCallback(async () => {
    if (!path) return;
    try {
      return await api.storage().getDownloadURL(path);
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }, [api, path]);
  // side effects
  useEffect(() => {
    if (!checkTick) return;
    const timeout = setTimeout(async () => {
      const imageURL = await fetchImageURL();
      if (imageURL) {
        setURL(imageURL);
        setCheckTick(undefined);
      } else setCheckTick((value) => (value ?? 0) + 1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [checkTick, fetchImageURL]);
  // result
  return {
    checkTick,
    setCheckTick,
    url,
  };
};
