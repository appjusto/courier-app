import { useRef } from 'react';

export const useRefs = <T>() => {
  const first = useRef<T>(null);
  const second = useRef<T>(null);
  const third = useRef<T>(null);
  const fourth = useRef<T>(null);
  const fifth = useRef<T>(null);
  const sixth = useRef<T>(null);
  return [first, second, third, fourth, fifth, sixth];
};
