import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { ArrowRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { Animated, Dimensions, LayoutAnimation, View, ViewProps } from 'react-native';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { DefaultText } from '../../texts/DefaultText';
import { DefaultButton } from '../default/DefaultButton';

interface Props extends ViewProps {
  text: string;
  trackText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  color: string;
  onConfirm: () => void;
}

const { width } = Dimensions.get('window');
const threshold = 0.7;

export const ConfirmButton = ({
  text,
  trackText,
  disabled,
  isLoading = false,
  onConfirm,
  color,
  style,
  ...props
}: Props) => {
  // state
  const [translateX, setTranslateX] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [buttonWidth, setButtonWidth] = useState<number>();
  const [rightmost, setRightmost] = useState(width);
  // UI handlers
  const onGestureEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (disabled || confirmed) return;
    const { translationX } = event.nativeEvent;
    if (translationX > 0 && translationX <= rightmost) setTranslateX(translationX);
  };
  const maxX = rightmost - (buttonWidth ?? 0);
  const translateM = translateX > 0 ? translateX / maxX : 0;
  // console.log(translateX, translateM);
  const onGestureEnded = () => {
    if (!buttonWidth) return;
    const shouldConfirm = translateM > threshold;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (shouldConfirm) {
      setConfirmed(true);
      setTranslateX(maxX);
      onConfirm();
    } else {
      setTranslateX(0);
    }
  };
  // console.log('buttonWidth', buttonWidth);
  // UI
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: paddings.lg,
          backgroundColor: colors.neutral50,
          ...borders.default,
          borderColor: colors.neutral50,
        },
        style,
      ]}
      onLayout={(layout) => {
        setRightmost(layout.nativeEvent.layout.width);
      }}
      {...props}
    >
      {/* thumb */}
      <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnded}>
        <Animated.View
          style={{
            // position: 'absolute',

            transform: [{ translateX }],
          }}
        >
          <DefaultButton
            style={{ width: buttonWidth }}
            title={text}
            loading={isLoading || confirmed}
            disabled={disabled}
            rightView={
              <ArrowRight style={{ marginLeft: paddings.xs }} size={16} color={colors.white} />
            }
            onLayout={(layout) => {
              if (!buttonWidth) setButtonWidth(layout.nativeEvent.layout.width);
            }}
            onPress={() => null}
          />
        </Animated.View>
      </PanGestureHandler>

      {/* track */}
      <View>
        {!isLoading && trackText ? (
          <View>
            <Animated.View
              style={{
                opacity: 1 - translateM,
              }}
            >
              <DefaultText size="md">{trackText}</DefaultText>
            </Animated.View>
          </View>
        ) : null}
      </View>
    </View>
  );
};
