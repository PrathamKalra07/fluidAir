import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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
    const [isLabour,setIsLabour]= useState(false);

    useEffect(() => {
        console.log('order line items : ',items);
    },[]);

    return(
        <>
        <ScrollView contentContainerClassName='pb-[100]'>
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
                        <Text>{items?.FConnect__Status__c}</Text>
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

            <View className='bg-gray-300 py-1 px-1 rounded-full flex flex-row w-[90%] mx-auto justify-between'>
                <View className='flex flex-row w-1/2 justify-center'>
                <TouchableOpacity className={'items-center justify-center '+ (!isLabour ? ' bg-white' : 'bg-gray-300') + ' rounded-full p-2 w-[100%]'}  onPress={()=>setIsLabour(false)}>
                <Text className='text-center text-lg font-medium'>
                    Order Line Items
                </Text>
                </TouchableOpacity>
                </View>
                <View className='flex flex-row w-1/2 justify-center'>
                <TouchableOpacity className={'items-center justify-center'+ (isLabour ? ' bg-white' : 'bg-gray-300') +' rounded-full p-2 w-[100%]'} onPress={()=>setIsLabour(true)}>
                <Text className='text-center text-lg font-medium'>
                    Labour
                </Text>
                </TouchableOpacity>
                </View>
            </View>

            

            {!isLabour ? 
            <>
            <View className='flex mx-6 flex-row justify-between mt-6'>
            <Text className='text-xl'>Order Items</Text>
            <Text className='text-lg text-gray-500'>{items?.Required_Materials__r.records.length} Items</Text>
            </View>
            <View className='gap-5 mt-2'>
    
            {items && items.Required_Materials__r && items.Required_Materials__r.records.map((item,index)=>{
                return <View key={index} className=' mx-5 border border-gray-300 rounded-xl shadow-xl p-0 bg-white'>
                <View className='flex flex-row m-3'>

                <View className='w-[10%]'>
                    <Text className='bg-rose-800 rounded-full w-8 h-8 text-center align-middle text-white'>{index+1}</Text>
                </View>
                <View className='w-[90%]'>
                    <View className='mx-2'>
                    <Text className='font-medium text-lg'>{item.Item_Name__c }</Text>
                    <Text className='font-normal text-base text-gray-600'>
                        {item.Item_Description__c}
                    </Text>
                    </View>
                </View>
                </View>
                <View className='border-t-2 border-red-100 py-1 flex flex-row justify-evenly' >
                    <View className='flex flex-row'>
                    <CubeRed width={20} height={20} />
                    <Text> Qty </Text>
                    <Text className='font-bold'>{item.FConnect_Quantity_Neeed__c}</Text>
                    </View>
                    <View>
                    <Text>×</Text>
                    </View>
                    <View>
                        <Text className='font-bold'>
                            ${item.Discounted_Unit_Price__c}
                        </Text>
                    </View>
                    <View>
                    <Text>=</Text>
                    </View>
                    <View className='flex flex-row'>
                        <Text> Total </Text>
                        <Text className='font-bold text-rose-800'>
                            ${item.FConnect_Quantity_Neeed__c * item.Discounted_Unit_Price__c}
                        </Text>
                    </View>
                </View>
                
            </View>
            })}
            </View>
            </>
            :
            <View>
                <View className='mx-6 flex flex-row justify-between mt-6 mb-2'>
                    <Text className='text-xl '>Labour - Steps</Text>
                    <Text className='text-lg text-gray-600'>{items?.FConnect__Activities__r.records.length | 0} Steps</Text>
                </View>

                <View className='gap-3'>
                {items?.FConnect__Activities__r && items.FConnect__Activities__r.records.length > 0 && items.FConnect__Activities__r.records.map((step,index)=>{
                    return <View key={index} className=' mx-5 my-0 border border-gray-300 rounded-xl shadow-xl p-0 bg-white'>
                        
                        <View className='flex flex-row m-3'>

                            <View className='w-[10%]'>
                                <Text className='bg-rose-800 rounded-full w-8 h-8 text-center align-middle text-white'>{index+1}</Text>
                            </View>
                            <View className='w-[90%] justify-center'>
                                <Text className='text-xl font-medium mx-2'>
                                    {step.Name}
                                </Text>
                                <View className='flex flex-row mx-2'>
                                    <Text className='text-gray-600'>
                                        Technician : </Text>
                                    <Text className='font-medium'>
                                        {step.Tech_Name__c}
                                    </Text>
                                </View>
                                <View className='mx-2'>
                                    <View className='flex flex-row gap-2'>
                                        <Text className='text-gray-600'>
                                            Rate/Hour : 
                                        </Text>
                                        <Text>
                                            ${step.Rate_Hour__c}
                                        </Text>
                                    </View>
                                                                    <View className='flex flex-row gap-2'>
                                        <Text className='text-gray-600'>
                                            Est. Hrs : 
                                        </Text>
                                        <Text>
                                            {step.FConnect__Estimated_Duration__c} hrs
                                        </Text>
                                    </View>
                                                                    <View className='flex flex-row gap-2'>
                                        <Text className='text-gray-600'>
                                            Billable Hrs : 
                                        </Text>
                                        <Text className='text-rose-900'>
                                            {step.Billable_Hours__c} hrs
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                }) }


                </View>
            </View>
            
            }

            

        </ScrollView>
        {!isLabour && 
        <View className='fixed bottom-0 w-[90%] pb-[100] mx-auto bg-transparent'>
                <TouchableOpacity className='py-3 px-3 rounded-xl bg-rose-900 flex flex-row justify-between'>
                    <Text className='text-white text-lg'>
                        Order Total
                    </Text>
                    <Text className='text-white font-bold text-lg'>
                        ${items?.Grand_Total__c | 0}
                    </Text>
                </TouchableOpacity>
            </View>
        }

        </>
    );
}