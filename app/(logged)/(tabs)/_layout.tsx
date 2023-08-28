import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, ViewProps, useColorScheme } from 'react-native';

import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import Colors from '@/common/styles/themes';
import { Home, Receipt, Users2 } from 'lucide-react-native';

interface TabIconProps extends ViewProps {
  focused?: boolean;
}

const TabIcon = ({ focused, children, ...props }: TabIconProps) => (
  <View
    style={{
      width: 64,
      ...borders.default,
      borderColor: focused ? colors.neutral100 : colors.white,
      backgroundColor: focused ? colors.neutral100 : colors.white,
      alignItems: 'center',
    }}
    {...props}
  >
    {children}
  </View>
);

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
            <TabIcon focused={focused}>
              <Home size={24} color={focused ? activeColor : inactiveColor} />
            </TabIcon>
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
            <TabIcon focused={focused}>
              <Receipt size={24} color={focused ? activeColor : inactiveColor} />
            </TabIcon>
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
            <TabIcon focused={focused}>
              <Users2 size={24} color={focused ? activeColor : inactiveColor} />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
