import analytics from '@react-native-firebase/analytics';

export const trackEvent = async (name: string, params?: { [key: string]: any }) => {
  const eventName = name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replaceAll(' ', '_')
    .slice(0, 40);
  console.log('trackEvent', name, params);
  try {
    await analytics().logEvent(eventName, params);
  } catch (error) {
    console.error(error);
  }
};
