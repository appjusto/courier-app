import { StyleSheet } from 'react-native';

import { useContextApi } from '@/api/ApiContext';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { useEffect } from 'react';

export default function TabTwoScreen() {
  // context
  const api = useContextApi();
  // side effects
  useEffect(() => {
    api
      .getServerTime()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [api]);
  // UI
  return (
    <DefaultView style={styles.container}>
      <DefaultText style={styles.title}>Tab Two</DefaultText>
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
