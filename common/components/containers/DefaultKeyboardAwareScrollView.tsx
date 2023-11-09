import screens from '@/common/styles/screens';
import { RefObject, forwardRef } from 'react';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

export const DefaultKeyboardAwareScrollView = forwardRef(
  ({ style, ...props }: KeyboardAwareScrollViewProps, externalRef) => {
    return (
      <KeyboardAwareScrollView
        ref={externalRef as RefObject<KeyboardAwareScrollView>}
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
  }
);
