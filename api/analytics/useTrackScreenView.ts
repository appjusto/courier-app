import { useEffect } from 'react';

export const useTrackScreenView = (name: string, params = {}) => {
  useEffect(() => {
    // analytics().logScreenView({ screen_name: name, ...params });
  }, [name]);
};
