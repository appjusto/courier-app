import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

const KEY = 'display-over-apps-status';

export const useShowDisplayOverApps = (shouldShowLocationDisclosure?: boolean) => {
  // state
  const [shouldShow, setShouldShow] = useState<boolean>();
  // side effects
  useEffect(() => {
    if (Platform.OS !== 'android') {
      setShouldShow(false);
    } else if (shouldShowLocationDisclosure) {
      setShouldShow(false);
    } else if (shouldShow === undefined) {
      AsyncStorage.getItem(KEY)
        .then((value) => {
          setShouldShow(!value);
        })
        .catch((error: unknown) => {
          console.error(error);
          setShouldShow(true);
        });
    }
  }, [shouldShow, shouldShowLocationDisclosure]);
  // result
  const setDisplayOverAppsShown = useCallback(() => {
    AsyncStorage.setItem(KEY, 'shown')
      .then(() => {
        setShouldShow(false);
      })
      .catch((error: unknown) => {
        console.error(error);
        setShouldShow(true);
      });
  }, []);
  return { shouldShowdisplayOverApps: shouldShow, setDisplayOverAppsShown };
};
