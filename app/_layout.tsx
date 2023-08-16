import { ApiProvider } from '@/api/ApiContext';
import { AuthProvider } from '@/common/auth/AuthContext';
import { setupNotifications } from '@/common/notifications/setup';
import { useNotificationHandler } from '@/common/notifications/useNotificationHandler';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// setup notification channels and background notification task
setupNotifications().then(null).catch(console.error);

export default function RootLayout() {
  // state
  const [loaded, error] = useFonts({
    BarlowSemiBold: require('../assets/fonts/Barlow-SemiBold.ttf'),
    BarlowMedium: require('../assets/fonts/Barlow-Medium.ttf'),
    ...FontAwesome.font,
  });
  const colorScheme = useColorScheme();
  // side effects
  // notification handler
  useNotificationHandler();
  // error handling
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  // splash
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  // UI
  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ActionSheetProvider>
        <ApiProvider>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </ApiProvider>
      </ActionSheetProvider>
    </ThemeProvider>
  );
}
