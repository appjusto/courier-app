import { ApiProvider } from '@/api/ApiContext';
import { LocationProvider } from '@/api/location/LocationContext';
import '@/api/location/registerLoationHeadlessTask';
import { useConfigLocation } from '@/api/location/useConfigLocation';
import { AuthProvider } from '@/common/auth/AuthContext';
import { useSplashScreen } from '@/common/components/splashscreen/useSplashScreen';
import { ToastProvider } from '@/common/components/views/toast/ToastContext';
import { setupNotifications } from '@/common/notifications/setup';
import { getAppVersion } from '@/common/version';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { Platform, ToastAndroid, useColorScheme } from 'react-native';
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
  const splashScreenShown = useSplashScreen();
  const colorScheme = useColorScheme();
  // side effects
  // location
  const locationReady = useConfigLocation();
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
  useEffect(() => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(getAppVersion(), 1500);
    }
  }, []);
  // UI
  if (!loaded || !locationReady) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ActionSheetProvider>
        <ToastProvider>
          <ApiProvider>
            <AuthProvider>
              <LocationProvider>
                <Slot />
              </LocationProvider>
            </AuthProvider>
          </ApiProvider>
        </ToastProvider>
      </ActionSheetProvider>
    </ThemeProvider>
  );
}
