import React, { useEffect } from 'react';
import { View, Text, ScrollView, Touchable,TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import GtRed from '../../assets/gtRed.svg'
import { TouchableWithoutFeedback } from 'react-native';

type OrderDetails = {
  order: Record<string, any> | null;
  backToOrder: Function,
  openOrderLineItems:Function
};

export default function OrderDetails({order,backToOrder,openOrderLineItems}:OrderDetails) {
  // const route = useRoute<RouteProp<{ params: OrderDetailsRouteParams }, 'params'>>();
  // const { order } = route.params;
    useEffect(()=>{
      console.log('order : ',order);
      console.log('childOrders: ',order?.Orders__r.records);
      console.log('total child count : ',order?.Orders__r.totalSize)
  },[])

  return (
    <ScrollView className="p-4">
      <TouchableWithoutFeedback className='mb-4' onPress={()=>backToOrder()}>
      <Text className='text-red-700 font-medium text-lg mb-2'>&lt; Back to Orders</Text>
      </TouchableWithoutFeedback>

      <View className='border border-gray-300 rounded-xl p-4'>
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

      <View className='flex-1 flex-row px-2 justify-between my-4'>
      <Text className='text-xl font-medium'>Child Orders</Text>
      <Text className='text-lg text-gray-500'>2 Orders</Text>
      </View>
      {/* Render child orders if present */}
      {/* <Text>{}</Text> */}
      {order?.Orders__r?.totalSize > 0 ? order?.Orders__r.records.map((child,index)=>
        <TouchableOpacity key={index} className="bg-white rounded-xl p-4 border border-gray-300 pr-16 my-2">
          {/* <Text className="text-lg font-semibold mb-2">Child Orders</Text> */}
          {/* {order.ChildOrders__r.map((child, index) => ( */}
            {/* <Text className='text-4'>&gt;</Text> */}
            <View className='absolute top-[62] right-2 flex-1 flex-col items-center justify-center]'>

            <GtRed height={32} width={32} />
            </View>
            <View className="p-2 flex-1 flex-row justify-between">
              <Text className="font-medium">{child.Name}</Text>
              <Text className="font-bold mr-1">${child.Grand_Total__c}</Text>
            </View>
            <View className="p-2 flex-1 flex-row justify-between">
              <View className='flex-1'>
                <Text className='text-gray-500'>
                  Approved Date:
                </Text>
                <Text className="font-medium">{new Date(child.Date_Approved__c).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short', // "Jan", "Feb", etc.
    day: 'numeric',
  })}</Text>
              </View>
              <View className='flex-1 flex-row items-center justify-end'>
                <Text className='text-3xl'> • </Text>
                <Text>{child.FConnect__Order_Status__c}</Text>
              </View>
              
            </View>
            <View className='flex-1 flex-row justify-between pr-2'>
              <View className='p-2'>
                <Text className='text-gray-500'>Site</Text>
                <Text className='font-medium'>{child.FConnect__Site_Name__r.Name}</Text>
              </View>
              <View className='flex-1 flex-row justify-end items-end pb-2'>
                {/* <Text className='text-gray-500'>Site</Text> */}
                <Text className='font-medium text-red-700'>{child.FConnect__Required_Materials__r?.totalSize && child.FConnect__Required_Materials__r.totalSize > 0 ? child.FConnect__Required_Materials__r.totalSize : 0 } Items</Text>
              </View>
            </View>
          {/* ))} */}
        </TouchableOpacity>
      ) : (
        <Text className="text-gray-400 italic p-4">No child orders</Text>
      )}
    </ScrollView>
  );
}
