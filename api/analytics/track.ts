import analytics from '@react-native-firebase/analytics';

export const trackEvent = (name: string, params?: { [key: string]: any }) =>
  analytics().logEvent(name, params).catch(console.error);
