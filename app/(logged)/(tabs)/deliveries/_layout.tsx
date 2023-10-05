import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
};

export default function DeliveriesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="history" options={{ title: 'Histórico de corridas' }} />
      <Stack.Screen name="ledger" options={{ title: 'Histórico de ganhos' }} />
      <Stack.Screen name="withdraws/index" options={{ title: 'Transferências' }} />
      <Stack.Screen
        name="withdraws/[id]"
        options={{ title: 'Detalhe', headerBackTitleVisible: false }}
      />
    </Stack>
  );
}
