import BackgroundGeolocation from 'react-native-background-geolocation';

export const startBackgroundGeolocation = async () => {
  const state = await BackgroundGeolocation.getState();
  if (!state.enabled) {
    await BackgroundGeolocation.start();
  }
  const location = await BackgroundGeolocation.getCurrentPosition({
    samples: 1,
    persist: false,
  });
  return location;
};
