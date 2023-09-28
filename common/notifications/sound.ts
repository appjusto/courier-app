import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

let _sound: Sound;
const getSound = async () => {
  if (!_sound) {
    _sound = (await Audio.Sound.createAsync(require('../../assets/sounds/order_request.wav')))
      .sound;
  }
  return _sound;
};

export const playOrderRequestSound = async () => {
  const sound = await getSound();
  await sound.playAsync();
};

export const stopOrderRequestSound = async () => {
  if (!_sound) return;
  await _sound.stopAsync();
};
