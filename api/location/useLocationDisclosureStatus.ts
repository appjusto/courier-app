import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export type LocationDisclosureStatus = 'shown' | 'not-shown';
const KEY = 'disclosure-status';

export const useLocationDisclosureStatus = () => {
  // state
  const [status, setStatus] = useState<LocationDisclosureStatus>();
  // side effects
  useEffect(() => {
    if (status === undefined) {
      AsyncStorage.getItem(KEY)
        .then((value) => {
          setStatus(value ? 'shown' : 'not-shown');
        })
        .catch((error: unknown) => {
          console.error(error);
          setStatus('not-shown');
        });
    }
  }, [status]);
  // result
  const setLocationDisclosureShown = useCallback(() => {
    AsyncStorage.setItem(KEY, 'shown')
      .then(() => {
        setStatus('shown');
      })
      .catch((error: unknown) => {
        console.error(error);
        setStatus('not-shown');
      });
  }, []);
  return { locationDisclosureStatus: status, setLocationDisclosureShown };
};
