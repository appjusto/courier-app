import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
export const ProfileTabIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
    />
    <Path fill="#fff" d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <Path fill="#78E08F" d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    />
  </Svg>
);
