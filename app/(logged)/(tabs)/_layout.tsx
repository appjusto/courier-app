import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '@/common/styles/themes';
import { OrdersTabIcon } from '@/common/tabs/icons/orders-tab-icon';
import { ProfileTabIcon } from '@/common/tabs/icons/profile-tab-icon';
import { HomeTabIcon } from '../../../common/tabs/icons/home-tab-icon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => <HomeTabIcon />,
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
          tabBarIcon: ({ focused }) => <OrdersTabIcon />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Sua conta',
          headerShown: false,
          tabBarIcon: ({ focused }) => <ProfileTabIcon />,
        }}
      />
    </Tabs>
  );
}
