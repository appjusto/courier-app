import { Loading } from '@/common/components/views/Loading';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import WebView from 'react-native-webview';
import { useMarkdown } from './useMarkdown';

interface Props {
  url: string;
  fallback?: string;
}

export function MarkdownView({ url, fallback }: Props) {
  // state
  const markdown = useMarkdown(url, fallback);
  if (!markdown) return <Loading />;
  // helpers
  const head =
    '<head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>';
  const html = `<html>${head}<body>${markdown}</body></html>`;
  // UI
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html }}
      containerStyle={{
        backgroundColor: colors.white,
        paddingHorizontal: paddings.lg,
        paddingBottom: 20,
      }}
      style={{}}
    />
  );
}
