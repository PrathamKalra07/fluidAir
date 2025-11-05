import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type OrderDetails = {
  order: Record<string, any> | null;
};

export default function OrderDetails({order}:OrderDetails) {
  // const route = useRoute<RouteProp<{ params: OrderDetailsRouteParams }, 'params'>>();
  // const { order } = route.params;

  return (
    <ScrollView className="p-4">
      <View className='mb-4'>
      <Text className='text-red-700 font-medium text-lg'>&lt; Back to Orders</Text>
      </View>

      <View className='border border-gray-300 rounded-3xl p-4'>
          <View className='flex-1 flex-row justify-between my-1'>
          <View className='flex-1 flex-row'>
            <Text className='text-gray-500'>Order ID : </Text>
            <Text className="font-semibold">{order?.Name}</Text>
          </View>
          <View className='flex-1 flex-row'>
            <Text className='text-gray-500'>Status : </Text>
            <Text className="font-semibold">{order?.FConnect__Order_Status__c}</Text>
          </View>
        </View>
          <View className='flex-1 flex-row justify-between my-1'>
          <View className='flex-1 flex-row flex-wrap flex-shrink'>
            <Text className='text-gray-500'>Technician : </Text>
            <Text className="font-semibold flex-shrink flex-wrap" numberOfLines={0}>{order?.FConnect__Technician_used__r?.Name}</Text>
          </View>
          <View className='flex-1 flex-row'>
            <Text className='text-gray-500'>Total : </Text>
            <Text className="font-semibold">${order?.Parent_Order_Total__c}</Text>
          </View>
        </View>
          <View className='flex-1 flex-row justify-between my-1'>
          <View className='flex-1 flex-row'>
            <Text className='text-gray-500'>Start Date : </Text>
            <Text className="font-semibold">{order?.Last_Event_Start_Date__c}</Text>
          </View>
          <View className='flex-1 flex-row'>
            <Text className='text-gray-500'>End Date : </Text>
            <Text className="font-semibold">{order?.Last_Event_End_Date__c}</Text>
          </View>
        </View>
      
      </View>

      {/* Render child orders if present */}
      {order?.ChildOrders__r?.length ? (
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
