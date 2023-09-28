import storage from '@react-native-firebase/storage';

export const getDownloadURL = (path: string) => {
  return storage().ref(path).getDownloadURL();
};
