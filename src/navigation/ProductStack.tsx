import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from '../screens/ProductDetail';

export type ProductStackParamsList = {
  ProductDetails: { product: Record<string, any> };
//   OrderLineItems: { items: Record<string, any>[] };
};

// const Stack = createNativeStackNavigator<OrdersStackParamList>();
const Stack = createNativeStackNavigator<ProductStackParamsList>();


export default function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="OrdersList" component={Orders} /> */}
      <Stack.Screen name="ProductDetails" component={ProductDetail} />
      {/* <Stack.Screen name="OrderLineItems" component={OrderLineItems} /> */}
      {/* <Stack.Screen name="ChildOrders" component={ChildOrders} /> */}
    </Stack.Navigator>
  );
}
