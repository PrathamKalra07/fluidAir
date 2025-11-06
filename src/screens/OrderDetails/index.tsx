import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderLineItems from '../OrderLineItems';
import { RouteProp, useRoute } from '@react-navigation/native';
import GtRed from '../../assets/gtRed.svg';
import { TouchableWithoutFeedback } from 'react-native';

type OrderDetails = {
  order: Record<string, any> | null;
  backToOrder: Function;
  openOrderLineItems: Function;
};

export default function OrderDetails({
  order,
  backToOrder,
  openOrderLineItems,
}: OrderDetails) {


   const navigation = useNavigation();

  // const route = useRoute<RouteProp<{ params: OrderDetailsRouteParams }, 'params'>>();
  // const { order } = route.params;
  useEffect(() => {
    console.log('order : ', order);
    console.log('childOrders: ', order?.Orders__r.records);
    console.log('total child count : ', order?.Orders__r.totalSize);
  }, []);

  return (
    <ScrollView className=""> 

      <View className='p-4 flex flex-col gap-4'>

        <TouchableWithoutFeedback className="" onPress={() => backToOrder()}>
          <View className='flex flex-row items-center gap-2'>
              <GtRed height={20} width={20} style={{ transform: [{ rotate: '180deg' }] }}  />
              <Text className="text-red-700 font-medium text-lg ">
                  Back to Orders
              </Text>
          </View>
        </TouchableWithoutFeedback>

        <View className="border border-gray-300 rounded-xl p-4 bg-white  ">
          <View className="flex-1 flex-row my-1 w-full">
            <View className="flex flex-row w-3/5">
              <Text className="text-gray-500">Order ID : </Text>
              <Text className="font-semibold">{order?.Name}</Text>
            </View>
            <View className="flex flex-row w-2/5">
              <Text className="text-gray-500">Status : </Text>
              <Text className="font-semibold">
                {order?.FConnect__Order_Status__c}
              </Text>
            </View>
          </View>
          <View className="flex-1 flex-row gap-8 my-1">
            <View className="flex flex-row flex-wrap flex-shrink w-3/5">
              <Text className="text-gray-500">Technician : </Text>
              <Text
                className="font-semibold flex-shrink flex-wrap"
                numberOfLines={0}
              >
                {order?.FConnect__Technician_used__r?.Name}
              </Text>
            </View>
            <View className="flex w-2/5 flex-row">
              <Text className="text-gray-500">Total : </Text>
              <Text className="font-semibold">
                ${order?.Parent_Order_Total__c}
              </Text>
            </View>
          </View>
          <View className="flex-1 flex-row my-1">
            <View className="flex flex-row w-3/5">
              <Text className="text-gray-500">Start Date : </Text>
              <Text className="font-semibold">
                {order?.Last_Event_Start_Date__c}
              </Text>
            </View>
            <View className="flex flex-row w-2/5">
              <Text className="text-gray-500">End Date : </Text>
              <Text className="font-semibold">
                {order?.Last_Event_End_Date__c}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1 flex-row px-2 justify-between">
          <Text className="text-xl font-medium">Child Orders</Text>
          <Text className="text-lg text-gray-500">2 Orders</Text>
        </View>

        <View className='flex flex-col gap-4'>  

          {/* Render child orders if present */}
          {/* <Text>{}</Text> */}
          {order?.Orders__r?.totalSize > 0 ? (
            order?.Orders__r.records.map((child, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-300 flex flex-row"
                // onPress={() => openOrderLineItems(child.FConnect__Required_Materials__r)}
                onPress={() => navigation.navigate('OrderLineItems')}
              >
           
                <View className='w-10/12 flex flex-col gap-1'>

                  <View className="flex-1 flex-row justify-between items-center">
                    <Text className="font-medium">{child.Name}</Text>
                    <Text className="font-bold bg-gray-100 rounded-lg py-0.5 px-1.5">
                      ${child.Grand_Total__c}
                    </Text>
                  </View>

                  <View className="flex-1 flex-row justify-between items-center">
                    <View className="flex flex-row gap-2">
                      <Text className="text-gray-500">Approved Date:</Text>
                      <Text className="font-medium">
                        {new Date(child.Date_Approved__c).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short', // "Jan", "Feb", etc.
                            day: 'numeric',
                          },
                        )}
                      </Text>
                    </View>
                    <View className="flex flex-row items-center justify-end items-center">
                      <Text className="text-3xl"> • </Text>
                      <Text>{child.FConnect__Order_Status__c}</Text>
                    </View>
                  </View>

                  <View className="flex-1 flex-row justify-between items-center">
                    <View className="flex flex-row">
                      <Text className="text-gray-500">Site : </Text>
                      <Text className="font-medium">
                        {child.FConnect__Site_Name__r.Name}
                      </Text>
                    </View>

                    <View className="flex-1 flex-row justify-end items-end">
                      <Text className="font-medium text-red-700">
                        {child.FConnect__Required_Materials__r?.totalSize &&
                        child.FConnect__Required_Materials__r.totalSize > 0
                          ? child.FConnect__Required_Materials__r.totalSize
                          : 0}{' '}
                        Items
                      </Text>
                    </View>
                  </View>

                </View>
                <View className="w-2/12 flex justify-center items-end">
                  <GtRed height={25} width={25} />
                </View>

              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-gray-400 italic p-4">No child orders</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
