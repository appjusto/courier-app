import { forwardRef } from 'react';
import { Platform } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import { DefaultScrollView } from './DefaultScrollView';

export const DefaultKeyboardAwareScrollView = forwardRef(
  ({ style, ...props }: KeyboardAwareScrollViewProps, externalRef) => {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAwareScrollView
          enableAutomaticScroll
          keyboardOpeningTime={0}
          keyboardShouldPersistTaps="always"
          scrollIndicatorInsets={{ right: 1 }}
          {...props}
        />
      );
    }
    return <DefaultScrollView {...props} />;
  }
);
