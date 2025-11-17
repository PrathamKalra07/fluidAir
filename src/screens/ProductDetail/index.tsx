import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import GtRed from '../../assets/gtRed.svg';
import PinRed from '../../assets/pinRed.svg';
import SettingsWhite from '../../assets/settingsWhite.svg'

type ProductDetails = {
  product: Record<string, any> | null;
//   account: Record<string, any> | null;
  // backToOrder: Function;
  // openOrderLineItems: Function;
};

export const ProductDetail = () => {
    
  
  
  const navigation = useNavigation();
  
  const route = useRoute();

       const { product}: ProductDetails = route.params as ProductDetails;

  useEffect(()=>{
    console.log('Mounted Products : ',product);
  },[])

  return (
    <ScrollView
        contentContainerClassName='pb-[100]'
    >
      <TouchableOpacity className='flex flex-row items-center gap-2 mt-4 ml-4' onPress={()=>navigation.goBack()}>
              <GtRed height={20} width={20} style={{ transform: [{ rotate: '180deg' }] }}  />
              <Text className="text-red-700 font-medium text-lg ">
                  Installed Products
              </Text>
          </TouchableOpacity>


      <View>
        <View className='flex flex-row w-[90%] mx-auto bg-white shadow-xl rounded-xl py-2 px-6 flex-wrap mt-5'>
        <View className='w-[50%] my-2'>
          <Text className='text-gray-500 text-sm'>
            Make
          </Text>
          <Text className='text-lg font-medium'>
            {product?.Make__c}
          </Text>
        </View>
        <View className='w-[50%] my-2'>
          <Text className='text-gray-500 text-sm'>
            Model
          </Text>
          <Text className='text-lg font-medium'>
            {product?.Model__c}
          </Text>
        </View>
        <View className='w-[50%] my-2'>
          <Text className='text-gray-500 text-sm'>
            Serial Number
          </Text>
          <Text className='text-lg font-medium'>
            {product?.Serial_Number__c}
          </Text>
        </View>
        <View className='w-[50%] my-2'>
          <Text className='text-gray-500 text-sm'>
            Status
          </Text>
          <View className='flex flex-row'>
            <Text className={'text-lg font-medium '+(product?.Status__c==
          'Active'?'bg-green-100 border-2 border-green-300 text-green-700 ':'border-red-300 border-2 text-red-700 bg-red-100 ') + 'rounded-full px-2'}>
              {product?.Status__c}
            </Text>
          </View>
        </View>
        <View className='w-[50%] my-2'>
          <Text className='text-gray-500 text-sm'>
            Months Since Last PM
          </Text>
          <Text className='text-lg font-medium'>
            {product?.Days_Since_Install__c}
          </Text>
        </View>
        <View className='w-[50%] my-2'>
          <Text className='text-gray-500 text-sm'>
            Days Since Install          
          </Text>
          <Text className='text-lg font-medium'>
            {product?.Months_Since_Last_PM__c}
          </Text>
        </View>
        <View className='w-[50%] my-2'>
          <Text className='text-gray-500 text-sm'>
            IP Category          
          </Text>
          <Text className='text-lg font-medium'>
            {product?.IP_Category__c}
          </Text>
        </View>

        <View className='w-[100%] my-2 justify-center'>
          <Text className='text-sm text-gray-500'>
            Site
          </Text>
          <View className='items-center flex flex-row gap-2'>
            <PinRed width={14} height={14} />
                
                <Text className="text-sm text-rose-900 font-medium my-1">
                  {product?.FConnect__Site__r.Name}
                </Text>
          </View>
        </View>

        <View className='w-[100%] my-2 justify-center'>
          <Text className='text-sm text-gray-500'>
            Description
          </Text>
          <Text className='font-medium text-lg'>
            {product?.Short_Description__c}
          </Text>
        </View>

        <View className='w-[100%] my-2 justify-center'>
          <TouchableOpacity className='bg-rose-800 items-center py-3 rounded-xl flex flex-row gap-3 justify-center'>
            <SettingsWhite width={18} height={18} />
            <Text className='text-white font-medium text-lg'>
              Request Service
            </Text>
          </TouchableOpacity>
        </View>

        </View>



      </View>
    </ScrollView>
  )
}
