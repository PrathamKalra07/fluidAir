import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Orders from '../screens/Orders';
import Help from '../screens/Help';
import Contact from '../screens/Contact';

// Your icons
import Profile2 from '../assets/profile2.svg';
import Profile2Black from '../assets/profile2black.svg';
import OrdersBlack from '../assets/ordersBlack.svg';
import OrdersRed from '../assets/ordersRed.svg';
import HelpRed from '../assets/helpRed.svg';
import HelpBlack from '../assets/helpBlack.svg';
import ContactRed from '../assets/contactRed.svg';
import ContactBlack from '../assets/contactBlack.svg';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: '#ccc',
          paddingBottom: 8,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) =>
            focused ? <Profile2 width={30} height={24} /> : <Profile2Black width={30} height={24} />,
          tabBarActiveTintColor: '#AD033B',
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ focused }) =>
            focused ? <OrdersRed width={30} height={24} /> : <OrdersBlack width={30} height={24} />,
          tabBarActiveTintColor: '#AD033B',
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          tabBarLabel: 'Help',
          tabBarIcon: ({ focused }) =>
            focused ? <HelpRed width={30} height={24} /> : <HelpBlack width={30} height={24} />,
          tabBarActiveTintColor: '#AD033B',
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ focused }) =>
            focused ? <ContactRed width={30} height={24} /> : <ContactBlack width={30} height={24} />,
          tabBarActiveTintColor: '#AD033B',
        }}
      />
    </Tab.Navigator>
  );
}
