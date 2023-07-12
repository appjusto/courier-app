import { PressableProps } from 'react-native';

export type DefaultButtonProps = PressableProps & {
  title: string;
  variant?: 'primary';
};
