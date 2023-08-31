import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Animated, Platform, Pressable } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';

const duration = 250;
const delay = 5000;

export type ToastType = 'success' | 'error' | 'warning';

interface Props {
  message: string;
  type: ToastType;
  onHide?: () => void;
}

export default function Toast({ message, type, onHide }: Props) {
  // state
  const [opacity] = useState(new Animated.Value(0));
  const animation = Animated.sequence([
    Animated.timing(opacity, {
      useNativeDriver: false,
      toValue: 1,
      duration,
    }),
    Animated.timing(opacity, {
      useNativeDriver: false,
      delay,
      toValue: 0,
      duration,
    }),
  ]);
  // side effects
  useEffect(() => {
    if (!message) return;
    animation.start(() => {
      if (onHide) onHide();
    });
  }, [message, animation, onHide]);

  // UI
  const backgroundColor = () => {
    if (type === 'success') return colors.success500;
    if (type === 'error') return colors.error500;
    return colors.info500;
  };
  if (!message) return null;
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: Platform.OS === 'android' ? 0 : 0,
        width: '100%',
        minHeight: 60,
        padding: paddings.xl,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        opacity,
        backgroundColor: backgroundColor(),
      }}
    >
      <DefaultText size="sm" color="white" style={{ marginRight: paddings.xl }}>
        {message}
      </DefaultText>
      <Pressable onPress={onHide}>
        <X size={24} color={colors.white} />
      </Pressable>
    </Animated.View>
  );
}
