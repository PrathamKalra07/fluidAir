import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Orders from '../screens/Orders';
import Contact from '../screens/Contact';
import Help from '../screens/Help';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import Signup from '../screens/Signup';
import Splash from '../screens/Splash';
import Rest from '../screens/Rest';
import OrderDetails from '../screens/OrderDetails';

const Stack = createNativeStackNavigator();

type AllData = {
  account: Record<string, any> | null;
  orders: Record<string, any>[] | null;
  products: Record<string, any>[];
  sessionId: string | null;
};

export default function StackNavigator({ account, orders, products, sessionId }: AllData) {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,

        // ⚡ Native transitions (super smooth)
        animation: 'slide_from_right',
        animationDuration: 100, // keep short and snappy
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        detachPreviousScreen: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Rest" component={Rest} />
      <Stack.Screen name="OrderDetail" component={OrderDetails} />

      <Stack.Screen name="Profile">
        {(props) => <Profile {...props} account={account} products={products} />}
      </Stack.Screen>

      <Stack.Screen name="Orders">
        {(props) => <Orders {...props} account={account} orders={orders} />}
      </Stack.Screen>

      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
}
