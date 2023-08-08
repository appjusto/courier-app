import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const IconFreshdesk = (props: SvgProps) => {
  return (
    <Svg width={64} height={64} fill="none" {...props}>
      <Circle cx={32} cy={32} r={32} fill="#F6F6F6" />
      <Path
        fill="#FFE493"
        d="M33.75 44.162c-.3 0-.6-.07-.85-.21-1.87-1.02-5.16-2.1-7.22-2.37l-.29-.04c-1.31-.16-2.39-1.39-2.39-2.72v-12.08c0-.79.31-1.51.88-2.03.57-.52 1.31-.77 2.09-.7 2.2.17 5.52 1.27 7.4 2.45l.24.14c.07.04.22.04.28.01l.16-.1c1.88-1.18 5.2-2.3 7.41-2.49h.12c.73-.07 1.48.19 2.04.71.57.52.88 1.24.88 2.03v12.07c0 1.34-1.08 2.56-2.4 2.72l-.33.04c-2.06.27-5.36 1.36-7.19 2.37-.24.14-.53.2-.83.2Z"
      />
      <Path
        fill="#292D32"
        d="M32 42.08c-.3 0-.6-.07-.85-.21-1.87-1.02-5.16-2.1-7.22-2.37l-.29-.04c-1.31-.16-2.39-1.39-2.39-2.72V24.66c0-.79.31-1.51.88-2.03.57-.52 1.31-.77 2.09-.7 2.2.17 5.52 1.27 7.4 2.45l.24.14c.07.04.22.04.28.01l.16-.1c1.88-1.18 5.2-2.3 7.41-2.49h.12c.73-.07 1.48.19 2.04.71.57.52.88 1.24.88 2.03v12.07c0 1.34-1.08 2.56-2.4 2.72l-.33.04c-2.06.27-5.36 1.36-7.19 2.37-.24.14-.53.2-.83.2Zm-8.02-18.66c-.32 0-.61.11-.84.32-.25.23-.39.56-.39.92v12.08c0 .59.51 1.16 1.08 1.24l.3.04c2.25.3 5.7 1.43 7.7 2.52.09.04.22.05.27.03 2-1.11 5.47-2.25 7.73-2.55l.34-.04c.57-.07 1.08-.65 1.08-1.24V24.67c0-.37-.14-.69-.39-.93-.26-.23-.59-.34-.96-.32h-.12c-1.91.17-4.99 1.2-6.67 2.25l-.16.11c-.55.34-1.33.34-1.86.01l-.24-.14c-1.71-1.05-4.79-2.07-6.75-2.23h-.12Z"
      />
      <Path
        fill="#292D32"
        d="M32 41.24c-.41 0-.75-.34-.75-.75v-15c0-.41.34-.75.75-.75s.75.34.75.75v15c0 .42-.34.75-.75.75ZM27.75 29.24H25.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.25c.41 0 .75.34.75.75s-.34.75-.75.75ZM28.5 32.24h-3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75s-.34.75-.75.75Z"
      />
    </Svg>
  );
};
