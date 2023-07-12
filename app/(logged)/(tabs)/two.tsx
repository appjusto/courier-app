import { StyleSheet } from 'react-native';

import { DefaultText } from '@/common/expo/components/texts/DefaultText';
import { DefaultView } from '@/common/expo/components/views/DefaultView';

export default function TabTwoScreen() {
  return (
    <DefaultView style={styles.container}>
      <DefaultText style={styles.title}>Tab Two</DefaultText>
      <DefaultView
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
