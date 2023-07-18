import * as React from 'react';
import Svg, { Mask, Path, Rect, SvgProps } from 'react-native-svg';

export const HomeTabIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path stroke="#000" strokeLinecap="round" d="M12.5 10.5h8" />
    <Path
      fill="#fff"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.5 20.5V9.745L12 3.133l8.5 6.612V20.5A1.5 1.5 0 0 1 19 22H5a1.5 1.5 0 0 1-1.5-1.5Z"
    />
    <Rect
      width={3}
      height={3}
      x={14.5}
      y={13.5}
      fill="#fff"
      stroke="#000"
      rx={0.5}
    />
    <Mask id="a" fill="#fff">
      <Path d="M5.5 21.5V16a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v5.5" />
    </Mask>
    <Path fill="#6CE787" d="M5.5 21.5V16a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v5.5" />
    <Path
      fill="#000"
      d="M4.5 21.5a1 1 0 1 0 2 0h-2Zm7 0a1 1 0 1 0 2 0h-2Zm-5 0V16h-2v5.5h2Zm2-7.5h1v-2h-1v2Zm3 2v5.5h2V16h-2Zm-2-2a2 2 0 0 1 2 2h2a4 4 0 0 0-4-4v2Zm-3 2a2 2 0 0 1 2-2v-2a4 4 0 0 0-4 4h2Z"
      mask="url(#a)"
    />
    <Path stroke="#000" strokeLinecap="round" d="M3.5 10.5h3" />
  </Svg>
);
