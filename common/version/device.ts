import * as Device from 'expo-device';
import { Dimensions } from 'react-native';

export const getDeviceVersion = () =>
  `${Device.brand ?? Device.manufacturer} (${Device.osName} ${Device.osVersion})`;

export const onSimulator = () => !Device.isDevice;

export const isLargeScreen = () => {
  const { height } = Dimensions.get('window');
  return height > 700;
};

export const percentOfHeight = (percentage: number) => {
  const { height } = Dimensions.get('window');
  return (percentage / 100) * height;
};

export const percentOfWidth = (percentage: number) => {
  const { width } = Dimensions.get('window');
  return (percentage / 100) * width;
};
