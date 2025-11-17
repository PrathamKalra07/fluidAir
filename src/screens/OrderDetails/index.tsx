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
import CardWhite from '../../assets/cardWhite.svg';
import { TouchableWithoutFeedback } from 'react-native';
import { formatIsoToDDMMYY } from '../../utils/dateUtils';

type OrderDetails = {
  order: Record<string, any> | null;
  account: Record<string, any> | null;
  // backToOrder: Function;
  // openOrderLineItems: Function;
};

export default function OrderDetails() {


   const navigation = useNavigation();

   const route = useRoute();

   const { order,account}: OrderDetails = route.params as OrderDetails;

  // const route = useRoute<RouteProp<{ params: OrderDetailsRouteParams }, 'params'>>();
  // const { order } = route.params;
  useEffect(() => {
    console.log('order : ', order);
    // console.log('childOrders: ', order?.Orders__r.records);
    // console.log('total child count : ', order?.Orders__r.totalSize);
  }, []);

  return (
    <>
    <ScrollView contentContainerClassName='pb-[100]'> 

      <View className='p-4 flex flex-col gap-4'>

        <TouchableWithoutFeedback className="" onPress={() => navigation.goBack()}>
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
              <Text className="text-gray-500">Parent Order : </Text>
              <Text className="font-semibold">{order?.Name}</Text>
            </View>
            <View className="flex flex-row border-2 border-gray-200 px-4 py-0 rounded-full">
              <Text className="text-gray-500"></Text>
              <Text className="">
                {order?.Parent_Order_Status2__c}
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
              <Text className="text-gray-500">Start : </Text>
              <Text className="font-semibold">
                {formatIsoToDDMMYY(order?.Last_Event_Start_Date__c)}
              </Text>
            </View>
            <View className="flex flex-row w-2/5">
              <Text className="text-gray-500">End : </Text>
              <Text className="font-semibold">
                {formatIsoToDDMMYY(order?.Last_Event_End_Date__c)}
              </Text>
            </View>
          </View>
            <View className='my-1 flex flex-row'>
              <Text className='text-gray-500'>Purchase Order No : </Text>
              <Text className="font-semibold">{order?.Customer_Purchase_Order__c}</Text>
            </View>
            <View className='my-1 flex flex-row'>
              <Text className='text-gray-500'>Work Order No :</Text>
              <Text className="font-semibold">{order?.Customer_Work_Order__c}</Text>
            </View>
        </View>
        {order?.Parent_Order_Status2__c == 'Closed' && 
        <View>
          <TouchableOpacity className='bg-rose-800 py-3 flex flex-row justify-center items-center gap-3 rounded-xl'>
            <CardWhite height={22} width={22} />
            <Text className='text-white text-lg'>Pay Invoice</Text>
          </TouchableOpacity>
        </View>
        }

        <View className="flex-1 flex-row px-2 justify-between">
          <Text className="text-xl font-medium">Child Orders</Text>
          <Text className="text-lg text-gray-500">{order?.Orders__r?.totalSize | 0} Orders</Text>
        </View>

        <View className='flex flex-col gap-4'>  

          {/* Render child orders if present */}
          {/* <Text>{}</Text> */}
          {order && order.Orders__r && order?.Orders__r?.records?.length > 0 ? (
            order?.Orders__r.records.map((child, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white shadow-xl rounded-xl p-4 border border-gray-300 flex flex-row"
                // onPress={() => openOrderLineItems(child.FConnect__Required_Materials__r)}
                onPress={() => navigation.navigate('OrdersStack',{
                  screen: 'OrderLineItems',
                  params: { items: child ,account:account}
                })}
              >
           
                <View className='w-10/12 flex flex-col gap-1'>

                  <View className='flex flex-row'>
                    <Text className="text-lg font-medium w-3/4">{child.Name}</Text>
                    <Text className=' pl-4 pr-4 rounded-full border-2 border-gray-200'>{child.FConnect__Status__c}</Text>
                  </View>
                  <View className='flex flex-row'>
                    <View className='flex flex-row w-3/4 flex-wrap'>
                      <Text className='text-gray-500'>
                        Service Type : </Text>
                      <Text>
                        {child.Service_Type__c}
                      </Text>
                    </View>
                    <Text className='text-rose-800'>{child.Required_Materials__r?.totalSize || 0} item</Text>
                  </View>
                  <View className='flex flex-row justify-between'>
                    <View className='flex flex-row flex-wrap w-3/4' >
                    <Text className='text-gray-500'>Site : </Text>
                    <Text>{child.FConnect__Site_Name__r?.Name}</Text>
                    </View>
                    <View className='flex flex-row '>
                      <Text className='text-gray-500 text-lg'>
                        Total : 
                      </Text>
                      <Text className='font-semibold text-lg'>
                        ${child.Grand_Total__c}
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
    </>
  );
}
