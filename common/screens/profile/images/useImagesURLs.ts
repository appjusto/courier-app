import { useContextApi } from '@/api/ApiContext';
import { useContextProfile } from '@/common/auth/AuthContext';
import { useCallback, useEffect, useState } from 'react';

export const useImagesURLs = (autoCheck = true) => {
  // context
  const api = useContextApi();
  // state
  const profile = useContextProfile();
  const courierId = profile?.id;
  const [selfieUrl, setSelfieUrl] = useState<string | null>();
  const [documentUrl, setDocumentUrl] = useState<string | null>();
  const [checkSelfieTick, setCheckSelfieTick] = useState<number | undefined>(
    autoCheck ? 1 : undefined
  );
  const [checkDocumentTick, setCheckDocumentTick] = useState<number | undefined>(
    autoCheck ? 1 : undefined
  );
  // helpers
  const fetchSelfie = useCallback(async () => {
    if (!courierId) return;
    try {
      return await api.profile().getSelfieDownloadURL(courierId, '1024x1024');
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }, [api, courierId]);
  const fetchDocument = useCallback(async () => {
    if (!courierId) return;
    try {
      return await api.profile().getDocumentDownloadURL(courierId, '1024x1024');
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }, [api, courierId]);
  // side effects
  useEffect(() => {
    if (!checkSelfieTick) return;
    const timeout = setTimeout(async () => {
      const selfie = await fetchSelfie();
      if (selfie) {
        setSelfieUrl(selfie);
        setCheckSelfieTick(undefined);
      } else setCheckSelfieTick((value) => (value ?? 0) + 1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [checkSelfieTick, fetchSelfie]);
  useEffect(() => {
    if (!checkDocumentTick) return;
    const timeout = setTimeout(async () => {
      const document = await fetchDocument();
      if (document) {
        setDocumentUrl(document);
        setCheckDocumentTick(undefined);
      } else setCheckDocumentTick((value) => (value ?? 0) + 1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [checkDocumentTick, fetchDocument]);
  // result
  return {
    selfieUrl,
    documentUrl,
    checkSelfieTick,
    setCheckSelfieTick,
    checkDocumentTick,
    setCheckDocumentTick,
  };
};
