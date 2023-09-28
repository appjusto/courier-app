import Constants from 'expo-constants';
import * as Device from 'expo-device';

export const getDeviceVersion = () =>
  `${Device.brand ?? Device.manufacturer} (${Device.osName} ${Device.osVersion})`;

export const onSimulator = () => Constants.appOwnership === 'expo';
