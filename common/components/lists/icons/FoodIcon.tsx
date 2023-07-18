import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
export const FoodIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M16 4.667v2.666h3.333l-1.1 11.02c-.067.547-.527.98-1.087.98H16V18h.927l.933-9.333h-6.373l-.154-1.334h3.333V4.667H16ZM9.666 9.993c-2.5 0-5 1.34-5 4.007h10c0-2.667-2.5-4.007-5-4.007Zm-5 8.66c0 .374.3.674.674.674H14c.373 0 .673-.3.673-.674V18H4.667v.653Zm5-7.326c-.94 0-2.513.306-3.253 1.34h6.507c-.74-1.034-2.313-1.34-3.253-1.34Zm5 4.006v1.334h-10v-1.334h10Z"
      clipRule="evenodd"
    />
  </Svg>
);
