import analytics from '@react-native-firebase/analytics';

export const trackEvent = (name: string, params?: { [key: string]: any }) => {
  const eventName = name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replaceAll(' ', '_')
    .slice(0, 40);
  console.log('trackEvent', name, params);
  return analytics().logEvent(eventName, params).catch(console.error);
};
