import { ViewProps } from 'react-native';

export type DefaultButtonProps = ViewProps & {
  title: string;
  variant?: 'primary';
  disabled?: boolean;
  onPress: () => void;
};
