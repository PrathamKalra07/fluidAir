import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type OrderDetailsRouteParams = {
  order: Record<string, any>;
};

export default function OrderDetails() {
  const route = useRoute<RouteProp<{ params: OrderDetailsRouteParams }, 'params'>>();
  const { order } = route.params;

  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-semibold">{order.Name}</Text>
      <Text className="text-gray-500 mb-4">{order.FConnect__Order_Status__c}</Text>

      <View className="bg-gray-100 rounded-xl p-4 mb-4">
        <Text className="font-medium">Technician:</Text>
        <Text>{order.FConnect__Technician_used__r?.Name}</Text>
      </View>

      <View className="bg-gray-100 rounded-xl p-4 mb-4">
        <Text className="font-medium">Start:</Text>
        <Text>{order.Last_Event_Start_Date__c}</Text>
      </View>

      {/* Render child orders if present */}
      {order.ChildOrders__r?.length ? (
        <View className="bg-white rounded-xl p-4 border border-gray-300">
          <Text className="text-lg font-semibold mb-2">Child Orders</Text>
          {order.ChildOrders__r.map((child, index) => (
            <View key={index} className="p-2 border-b border-gray-200">
              <Text className="font-medium">{child.Name}</Text>
              <Text className="text-gray-600">{child.FConnect__Order_Status__c}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text className="text-gray-400 italic">No child orders</Text>
      )}
    </ScrollView>
  );
}
