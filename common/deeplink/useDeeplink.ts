import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ShowToast } from '../components/toast/Toast';
// import { useSafeRouter } from './useSafeRouter';

export const useDeeplink = (url?: string | null) => {
  // context
  // const router = useSafeRouter();
  // state
  const [deeplink, setDeeplink] = useState('');
  // const deeplink = useContextDeeplink();
  // side effects
  useEffect(() => {
    if (!url) return;
    ShowToast('useDeeplink url: ' + url);
    let match = url.match(/^appjustocourierdev:\/\/(.*)/i);
    if (match) setDeeplink(match[1]);
    else {
      match = url.match(/^exp\+app-justo-courier-dev:\/\/(.*)/i);
      if (match) setDeeplink(match[1]);
    }
    if (!match) {
      match = url.match(/^https:\/\/dev.appjusto.com.br(.*)/i);
      if (match) setDeeplink(match[1]);
    }
  }, [url]);
  useEffect(() => {
    if (!router) return;
    if (!deeplink) return;
    ShowToast('useDeeplink deeplink: ' + deeplink);
    router.push(deeplink);
    // setDeeplink('');
  }, [deeplink]);
  // }, [deeplink, router]);
  return deeplink;
};
