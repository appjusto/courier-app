import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, useColorScheme } from 'react-native';

import colors from '@/common/styles/colors';
import Colors from '@/common/styles/themes';
import { Home, Receipt, Users2 } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? 'light'].tabIconSelected;
  const inactiveColor = Colors[colorScheme ?? 'light'].tabIconDefault;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <View style={{ backgroundColor: focused ? colors.neutral100 : undefined }}>
              <Home size={24} color={focused ? activeColor : inactiveColor} />
            </View>
          ),
          headerRight: () => (
            <Link href="/matching" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="deliveries"
        options={{
          title: 'Suas corridas',
          tabBarIcon: ({ focused }) => (
            <View style={{ backgroundColor: focused ? colors.neutral100 : undefined }}>
              <Receipt size={24} color={focused ? activeColor : inactiveColor} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Sua conta',
          headerShown: false,
          // tabBarActiveBackgroundColor: colors.neutral100,
          // tabBarBackground: () => <View style={{ backgroundColor: colors.neutral100 }} />,
          tabBarIcon: ({ focused }) => (
            <View style={{ backgroundColor: focused ? colors.neutral100 : undefined }}>
              <Users2 size={24} color={focused ? activeColor : inactiveColor} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
