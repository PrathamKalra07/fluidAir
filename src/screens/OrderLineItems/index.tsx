import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import CubeRed from '../../assets/cubeRed.svg';
import GtRed from '../../assets/gtRed.svg';

type orderLink={
    items:Record<string,any> | null;
    backToDetails:Function;
}

export default function OrderLineItems() {

   const navigation = useNavigation();
    const route = useRoute();

    const {items,account}:orderLink = route.params as orderLink;

    useEffect(() => {
        console.log('order line items : ',items);
    },[]);

    return(
        <>
        <NavigationBar account={account} />s
        <ScrollView contentContainerClassName='pt-[120]'>
            <TouchableWithoutFeedback className="" onPress={() => navigation.goBack()}>
          <View className='flex flex-row items-center gap-2 mt-4 ml-4'>
              <GtRed height={20} width={20} style={{ transform: [{ rotate: '180deg' }] }}  />
              <Text className="text-red-700 font-medium text-lg ">
                  Back to Child Orders
              </Text>
          </View>
        </TouchableWithoutFeedback>
            <View className='m-4 border border-gray-300 p-3 rounded-xl bg-white'>
                <View className='flex flex-row'>
                    <View className='flex flex-row w-[50%] flex-wrap'>
                        <Text className='text-gray-500'>Child Order ID : </Text>
                        <Text>{items?.Name}</Text>
                    </View>
                    <View className='flex flex-row w-[50%] flex-wrap'>
                        <Text className='text-gray-500'>Status : </Text>
                        <Text>{items?.FConnect__Order_Status__c}</Text>
                    </View>
                </View>
                <View className='flex flex-row'>
                    <View className='flex flex-row w-[50%] flex-wrap'>
                        <Text className='text-gray-500'>Site : </Text>
                        <Text>{items?.FConnect__Site_Name__r.Name}</Text>
                    </View>
                    <View className='flex flex-row w-[50%] flex-wrap'>
                        <Text className='text-gray-500'>Total : </Text>
                        <Text className='font-bold'>$ {items?.Grand_Total__c}</Text>
                    </View>
                </View>
            </View>

            <View className='flex mx-6 flex-row justify-between'>
            <Text className='text-xl'>Order Items</Text>
            <Text className='text-lg text-gray-500'>4 Items</Text>
            </View>

            <View className=' m-5 border border-gray-300 rounded-xl shadow-xl p-0 bg-white'>
                <View className='flex flex-row m-3'>

                <View className='w-[10%]'>
                    <Text className='bg-rose-800 rounded-full w-8 h-8 text-center align-middle text-white'>1</Text>
                </View>
                <View className='w-[90%]'>
                    <View className='mx-2'>
                    <Text className='font-medium text-lg'>Industrial Air Compressor</Text>
                    <Text className='font-normal text-base text-gray-600'>
                        High-performance rotary screw air compressor with advanced cooling system and energy-efficient motor.
                    </Text>
                    </View>
                </View>
                </View>
                <View className='border-t-2 border-red-100 py-1 flex flex-row justify-evenly' >
                    <View className='flex flex-row'>
                    <CubeRed width={20} height={20} />
                    <Text> Qty </Text>
                    <Text className='font-bold'>2</Text>
                    </View>
                    <View>
                    <Text>×</Text>
                    </View>
                    <View>
                        <Text className='font-bold'>
                            $1234.500
                        </Text>
                    </View>
                    <View>
                    <Text>=</Text>
                    </View>
                    <View className='flex flex-row'>
                        <Text> Total </Text>
                        <Text className='font-bold text-rose-800'>
                            $1234.500
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
        </>
    );
}