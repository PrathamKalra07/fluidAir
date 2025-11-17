import React from 'react';
import { Easing } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationState } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Rest from '../screens/Rest';
import OrdersStack from './OrdersStack';
import ProductStack from './ProductStack';

const Stack = createStackNavigator();


export default function StackNavigator() {


  return (
    <>
      <Stack.Navigator
        initialRouteName="Splash"
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
        <Stack.Screen name="OrdersStack" component={OrdersStack} />
        <Stack.Screen name="ProductStack" component={ProductStack} />
      </Stack.Navigator>

    </>
  );
}
