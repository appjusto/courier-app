import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const IconApprovalProcess = (props: SvgProps) => {
  return (
    <Svg width={64} height={64} fill="none" {...props}>
      <Circle cx={32} cy={32} r={32} fill="#F6F6F6" />
      <Path
        fill="#FFE493"
        d="M32.745 24.442c.69-.59 1.82-.59 2.52 0l1.58 1.36c.3.26.86.47 1.26.47h1.7c1.06 0 1.93.87 1.93 1.93v1.7c0 .39.21.96.47 1.26l1.36 1.58c.59.69.59 1.82 0 2.52l-1.36 1.58c-.26.3-.47.86-.47 1.26v1.7c0 1.06-.87 1.93-1.93 1.93h-1.7c-.39 0-.96.21-1.26.47l-1.58 1.36c-.69.59-1.82.59-2.52 0l-1.58-1.36c-.3-.26-.86-.47-1.26-.47h-1.73c-1.06 0-1.93-.87-1.93-1.93v-1.71c0-.39-.21-.95-.46-1.25l-1.35-1.59c-.58-.69-.58-1.81 0-2.5l1.35-1.59c.25-.3.46-.86.46-1.25v-1.72c0-1.06.87-1.93 1.93-1.93h1.73c.39 0 .96-.21 1.26-.47l1.58-1.35Z"
      />
      <Path
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m28.38 32 2.41 2.42 4.83-4.84"
      />
      <Path
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M30.75 22.45c.69-.59 1.82-.59 2.52 0l1.58 1.36c.3.26.86.47 1.26.47h1.7c1.06 0 1.93.87 1.93 1.93v1.7c0 .39.21.96.47 1.26l1.36 1.58c.59.69.59 1.82 0 2.52l-1.36 1.58c-.26.3-.47.86-.47 1.26v1.7c0 1.06-.87 1.93-1.93 1.93h-1.7c-.39 0-.96.21-1.26.47l-1.58 1.36c-.69.59-1.82.59-2.52 0l-1.58-1.36c-.3-.26-.86-.47-1.26-.47h-1.73c-1.06 0-1.93-.87-1.93-1.93V36.1c0-.39-.21-.95-.46-1.25l-1.35-1.59c-.58-.69-.58-1.81 0-2.5l1.35-1.59c.25-.3.46-.86.46-1.25V26.2c0-1.06.87-1.93 1.93-1.93h1.73c.39 0 .96-.21 1.26-.47l1.58-1.35Z"
      />
    </Svg>
  );
};