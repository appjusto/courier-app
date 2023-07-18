import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
export const OrdersTabIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 22h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12l6 6Z"
    />
    <Path fill="#6CE787" d="M10 21.25V19a3 3 0 0 0-3-3H4" />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 21.25V19a3 3 0 0 0-3-3H4m10-1h2m-8-4h8M8 7h8"
    />
  </Svg>
);
