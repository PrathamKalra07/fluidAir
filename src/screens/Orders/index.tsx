import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Picklist from '../../components/Picklist';
import Filters from '../../assets/filters.svg';
import { OrdersStackParamList } from '../../navigation/OrdersStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

const FilterButton = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`border px-4 py-2 border-gray-400 rounded-3xl  ${
      active ? 'bg-[#AD033B]' : 'bg-white'
    }`}
  >
    <Text className={active ? 'text-white' : 'text-black'}>{label}</Text>
  </TouchableOpacity>
);

type accountOrders={
  account:Record<string,any> | null;
  orders: Record<string,any>[] | null;
}


export default function Orders() {

    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();

    const {orders,account,sessionId} = useSelector((state: RootState) => ({
      orders: state.orders.orders,
      account: state.account.account,
      sessionId: state.account.sessionId,
    }));

  const [filter, setFilter] = useState('all');

  // const getOrders = (filter) =>{
  //   const allOrders = orders;
  //   console.log('all orders : ',allOrders);
  //   return allOrders;
  // }

  const getOrderStatusCss=(status:string,element:string)=>{
    let css = '';
    if(element === 'view'){
      switch (status) {
        case 'Open':
          css = 'bg-lime-200 border border-lime-400 rounded-3xl absolute right-5 top-5'
          break;
        case 'Closed':
          css = 'bg-blue-200 border border-blue-400 rounded-3xl absolute right-5 top-5'
          break;
        case 'Cancelled':
          css = 'bg-red-200 border border-red-400 rounded-3xl absolute right-5 top-5'
          break;
        case 'Awaiting Invoice':
          css = 'bg-purple-200 border border-purple-400 rounded-3xl absolute right-5 top-5'
          break;
          
        case 'Pending Approval':
          css = 'bg-amber-200 border border-amber-400 rounded-3xl absolute right-5 top-5';
          break;
        case 'Approved':
          css = 'bg-green-200 border border-green-400 rounded-3xl absolute right-5 top-5';
          break;
        default:
          css = 'bg-gray-200 border border-gray-400 rounded-3xl absolute right-5 top-5'
          break;
      }
    }else{
      switch (status) {
        case 'Open':
          css = 'text-lime-700 font-medium px-3'
          break;
        case 'Closed':
          css = 'text-blue-700 font-medium px-3'
          break;
        case 'Cancelled' :
          css = 'text-red-700 font-medium px-3'
          break;
        case 'Awaiting Invoice':
          css = 'text-purple-700 font-medium px-3'  
          break;
        case 'Pending Approval':
          css = 'text-amber-700 font-medium px-3'
          break;
        case 'Approved':
          css = 'text-green-700 font-medium px-3'
          break;
        default:
          css= 'text-gray-700 font-medium px-3'
          break;
      }
    }

    return css;
  }

  // useEffect(()=>{
  //   getOrders('all');
  // },[]);



  return (
    <View className='overflow-visible'> 
      <View className="w-[85%] mx-auto mt-8 flex-row justify-between items-center">
        <Text className="text-2xl font-medium">Your Orders</Text>
        <View className="w-[50%] z-50">
          <Picklist />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          alignItems: 'center',
          gap: 10,
          height:76,
          // overflow:'visible'
        }}

      >
        <TouchableOpacity className="border p-2 border-gray-400 rounded-xl bg-white">
          <Filters height={18} width={18} />
        </TouchableOpacity>

        <FilterButton
          label="All"
          active={filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterButton
          label="Delivered"
          active={filter === 'delivered'}
          onPress={() => setFilter('delivered')}
        />
        <FilterButton
          label="In Transit"
          active={filter === 'inTransit'}
          onPress={() => setFilter('inTransit')}
        />
        <FilterButton
          label="Processing"
          active={filter === 'processing'}
          onPress={() => setFilter('processing')}
        />
        <FilterButton
          label="Scheduled"
          active={filter === 'scheduled'}
          onPress={() => setFilter('scheduled')}
        />
        <FilterButton
          label= "Cancelled"
          active={filter === 'cancelled'}
          onPress={() => setFilter('cancelled')}
        />
      </ScrollView>

      <ScrollView className='w-[100%] mx-auto' contentContainerStyle={{
        paddingBottom:350
      }}
      
      contentContainerClassName='overflow-visible '
      >

      {orders?.map((order,index)=>(
        <TouchableOpacity className='w-[85%] mx-auto shadow-xl p-4 border border-gray-300 rounded-xl mt-6 bg-white' key={index} onPress={() =>
            navigation.navigate('OrdersStack',{
              screen: 'OrderDetails',
              params: { order: order ,account:account}
            })}
            >

          <View  className=''>
            <View className={getOrderStatusCss(order.FConnect__Order_Status__c,'view')}>
              <Text className={getOrderStatusCss(order.FConnect__Order_Status__c,'text')}>{order.FConnect__Order_Status__c}</Text>
            </View>
          <Text className='text-xl font-medium p-1'>
            {order.Name}
          </Text>
          
          <View className="flex-row flex-wrap justify-between mt-1">
            <View className="w-[48%] p-1 rounded-lg">
              <Text className="text-gray-600">Technician</Text>
              <Text className="font-medium">{order.FConnect__Technician_used__r?.Name}</Text>
            </View>

            <View className="w-[48%] p-1 rounded-lg">
              <Text className="text-gray-600">Total</Text>
              <Text className="font-medium">${order.Parent_Order_Total__c}</Text>
            </View>

            <View className="w-[48%] p-1 rounded-lg">
              <Text className="text-gray-600">Start</Text>
              <Text className="font-medium">{order.Last_Event_Start_Date__c}</Text>
            </View>

            <View className="w-[48%] p-1 rounded-lg">
              <Text className="text-gray-600">End</Text>
              <Text className="font-medium">{order.Last_Event_End_Date__c}</Text>
            </View>
          </View>

        </View> 
          </TouchableOpacity>
        )
      )}
        

        
        

        
      </ScrollView>
    </View>
  );
}
