import screens from '@/common/styles/screens';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

export const DefaultKeyboardAwareScrollView = ({
  style,
  ...props
}: KeyboardAwareScrollViewProps) => {
  return (
    <KeyboardAwareScrollView
      style={[{ ...screens.default }, style]}
      enableOnAndroid
      enableAutomaticScroll
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
      {...props}
    />
  );
};
