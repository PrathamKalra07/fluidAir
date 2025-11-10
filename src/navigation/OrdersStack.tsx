import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from '../screens/Orders';
import OrderDetails from '../screens/OrderDetails';
import OrderLineItems from '../screens/OrderLineItems';
import ChildOrders from '../screens/ChildOrders'; // optional

export type OrdersStackParamList = {
  OrdersList: undefined;
  OrderDetails: { order: Record<string, any> };
  OrderLineItems: { items: Record<string, any>[] };
};

const Stack = createNativeStackNavigator<OrdersStackParamList>();


export default function OrdersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="OrdersList" component={Orders} /> */}
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="OrderLineItems" component={OrderLineItems} />
      {/* <Stack.Screen name="ChildOrders" component={ChildOrders} /> */}
    </Stack.Navigator>
  );
}
