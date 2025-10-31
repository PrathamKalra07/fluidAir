import React from 'react';
import { Easing } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Orders from '../screens/Orders';
import Contact from '../screens/Contact';
import Help from '../screens/Help';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import Signup from '../screens/Signup';
import Splash from '../screens/Splash';
import Rest from '../screens/Rest';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
    initialRouteName='Splash'
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: { duration: 200, easing: Easing.out(Easing.exp) },
          },
          close: {
            animation: 'timing',
            config: { duration: 200, easing: Easing.in(Easing.ease) },
          },
        },
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
            opacity: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        }),
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Rest" component={Rest} />

      {/* <Stack.Screen name="Orders" component={Orders} /> */}
      {/* <Stack.Screen name="Contact" component={Contact} /> */}
      {/* <Stack.Screen name="Help" component={Help} /> */}
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
    </Stack.Navigator>
  );
}
