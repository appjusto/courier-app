import * as Application from 'expo-application';
import * as SecureStore from 'expo-secure-store';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid/non-secure';

export const getInstallationId = async () => {
  let value = null;
  try {
    // https://github.com/expo/expo/issues/814
    value = await SecureStore.getItemAsync('installation-id');
    // value = await AsyncStorage.getItem('installation-id');
  } catch (e: any) {
    console.error(e);
  }
  try {
    if (!value) {
      value = Application.androidId ?? nanoid();
      await SecureStore.setItemAsync('installation-id', value);
      // await AsyncStorage.setItem('installation-id', value);
    }
    return value;
  } catch (e: unknown) {
    console.error(e);
  }
  return null;
};
