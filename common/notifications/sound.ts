import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { ShowToast } from '../components/toast/Toast';

let _sound: Sound;

export const playOrderRequestSound = async () => {
  try {
    _sound = (await Audio.Sound.createAsync(require('../../assets/sounds/order_request.wav')))
      .sound;
    await _sound.setStatusAsync({ positionMillis: 0, shouldPlay: true, volume: 1 });
  } catch (error: unknown) {
    ShowToast(error instanceof Error ? error.message : JSON.stringify(error));
  }
  // await sound.playAsync();
};

export const stopOrderRequestSound = async () => {
  if (!_sound) return;
  await _sound.setStatusAsync({ positionMillis: 0, shouldPlay: false, volume: 0 });
};
