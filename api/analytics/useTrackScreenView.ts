import { useUniqState } from '@/common/react/useUniqState';
import analytics from '@react-native-firebase/analytics';
import { useEffect } from 'react';

export const useTrackScreenView = (name: string, params = {}, enabled = true) => {
  // state
  const uniqParams = useUniqState(params);
  // side effects
  useEffect(() => {
    if (!uniqParams) return;
    if (!enabled) return;
    console.log('track', name, uniqParams);
    analytics()
      .logScreenView({ screen_name: name, ...uniqParams })
      .catch(console.error);
  }, [name, uniqParams, enabled]);
};
