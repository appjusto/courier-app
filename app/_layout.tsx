import { ApiProvider } from '@/api/ApiContext';
import '@/api/location/background/registerLoationHeadlessTask';
import { LocationProvider } from '@/api/location/context/LocationContext';
import { PlatformProvider } from '@/api/platform/context/PlatformContext';
import { AuthProvider } from '@/common/auth/AuthContext';
import { useSplashScreen } from '@/common/components/splashscreen/useSplashScreen';
import { ShowToast } from '@/common/components/toast/Toast';
import { ToastProvider } from '@/common/components/views/toast/ToastContext';
import { setupNotifications } from '@/common/notifications/setup';
import { getAppVersion } from '@/common/version';
import { getEnv } from '@/extra';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useURL } from 'expo-linking';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// setup notification channels and background notification task
setupNotifications().then(null).catch(console.error);
// setup background location task

export default function RootLayout() {
  // state
  const [loaded, error] = useFonts({
    HankenGroteskRegular: require('../assets/fonts/HankenGrotesk-Regular.ttf'),
    HankenGroteskMedium: require('../assets/fonts/HankenGrotesk-Medium.ttf'),
    HankenGroteskSemiBold: require('../assets/fonts/HankenGrotesk-SemiBold.ttf'),
    ...FontAwesome.font,
  });
  const colorScheme = useColorScheme();
  const splashScreenShown = useSplashScreen();
  const [inAppSuppressed, setInAppSuppressed] = useState(false);
  // side effects
  // error handling
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  // splash
  useEffect(() => {
    if (loaded && !splashScreenShown) {
      SplashScreen.hideAsync();
    }
  }, [loaded, splashScreenShown]);
  // deeplinking
  const url = useURL();
  // config
  useEffect(() => {
    // version toast
    if (getEnv() !== 'live') {
      ShowToast(getAppVersion());
    }
    // in-app messaging config
    inAppMessaging()
      .setMessagesDisplaySuppressed(true)
      .then(() => setInAppSuppressed(true));
  }, [url]);
  // UI
  if (!loaded || splashScreenShown || !inAppSuppressed) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ActionSheetProvider>
        <ToastProvider>
          <ApiProvider url={url}>
            <AuthProvider>
              <PlatformProvider>
                <LocationProvider>
                  <Slot />
                </LocationProvider>
              </PlatformProvider>
            </AuthProvider>
          </ApiProvider>
        </ToastProvider>
      </ActionSheetProvider>
    </ThemeProvider>
  );
}
