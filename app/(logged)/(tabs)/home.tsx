import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import screens from '@/common/styles/screens';
import { StyleSheet } from 'react-native';

export default function Home() {
  return (
    <DefaultView style={screens.default}>
      <DefaultText style={styles.title}>Home</DefaultText>
      <DefaultView style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
