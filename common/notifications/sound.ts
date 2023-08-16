import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

export const AUDIO_PATH = '../../assets/sounds/order_request.wav';

let _sound: Sound;
const getSound = async () => {
  if (!_sound) {
    _sound = (await Audio.Sound.createAsync(require(AUDIO_PATH))).sound;
  }
  return _sound;
};

export const playOrderRequestSound = async () => {
  console.log('playOrderRequestSound');
  const sound = await getSound();
  await sound.playAsync();
};

export const stopOrderRequestSound = async () => {
  console.log('stopOrderRequestSound');
  if (!_sound) return;
  await _sound.stopAsync();
};
