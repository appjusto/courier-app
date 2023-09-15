import { Platform, ToastAndroid } from 'react-native';

export const ShowToast = (message: string, duration = 1000) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, duration);
  }
};
