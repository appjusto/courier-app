import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const KEY = 'disclosure-status';

export const useLocationDisclosureStatus = () => {
  // state
  const [shouldShow, setShouldShow] = useState<boolean>();
  // side effects
  useEffect(() => {
    if (shouldShow === undefined) {
      AsyncStorage.getItem(KEY)
        .then((value) => {
          setShouldShow(!value);
        })
        .catch((error: unknown) => {
          console.error(error);
          setShouldShow(true);
        });
    }
  }, [shouldShow]);
  // result
  const setLocationDisclosureShown = useCallback(() => {
    AsyncStorage.setItem(KEY, 'shown')
      .then(() => {
        setShouldShow(false);
      })
      .catch((error: unknown) => {
        console.error(error);
        setShouldShow(true);
      });
  }, []);
  return { shouldShowLocationDisclosure: shouldShow, setLocationDisclosureShown };
};
