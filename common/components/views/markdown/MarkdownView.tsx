import { Loading } from '@/common/components/views/Loading';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Platform } from 'react-native';
import WebView from 'react-native-webview';
import { useMarkdown } from './useMarkdown';

interface Props {
  url: string;
  fallback?: string;
  title?: string;
}

const fontUrl = Platform.select({
  // ios: 'assets/fonts/HankenGrotesk-Regular.ttf',
  ios: 'HankenGrotesk-Regular.ttf',
  android: 'file:///android_asset/fonts/HankenGrotesk-Regular.ttf',
});

export function MarkdownView({ url, fallback, title }: Props) {
  // state
  const markdown = useMarkdown(url, fallback);
  if (!markdown) return <Loading title={title} />;
  // helpers
  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @font-face {
          font-family: 'HankenGrotesk-Regular'; 
          src: url('${fontUrl}') format('truetype');
        }
        body {
            font-family: HankenGrotesk-Regular;
            margin: 0;
            padding: 0;
        }
      </style>
    </head>
    <body>${markdown}</body>
  </html>`;
  // UI
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html, baseUrl: '' }}
      containerStyle={{
        backgroundColor: colors.white,
        paddingHorizontal: paddings.lg,
        paddingBottom: 20,
      }}
      style={{}}
    />
  );
}
