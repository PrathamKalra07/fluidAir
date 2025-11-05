import React from 'react';
import { View, Text, Button , ScrollView , StatusBar } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Help() {
  const navigation = useNavigation();

  return (

     <View className="p-4 gap-4">
        <Text className="text-xl text-semibold">Help & Support</Text>
        <ScrollView className='pb-10'>

        <View className="gap-4 flex flex-col">
          <View className="rounded-2xl flex gap-3 shadow bg-white p-5">
            <Text className="text-xl text-semibold text-[#101828]">FAQs</Text>
            <Text className="text-lg text-semibold text-[#4A5565]">Find answers to common questions</Text>
          </View> 
          <View className="rounded-2xl flex gap-3 shadow bg-white p-5">
            <Text className="text-xl text-semibold text-[#101828]">Order Tracking</Text>
            <Text className="text-lg text-semibold text-[#4A5565]">Track your order status</Text>
          </View> 
          <View className="rounded-2xl flex gap-3 shadow bg-white p-5">
            <Text className="text-xl text-semibold text-[#101828]">Returns & Refunds</Text>
            <Text className="text-lg text-semibold text-[#4A5565]">Learn about our return policy</Text>
          </View> 
          <View className="rounded-2xl flex gap-3 shadow bg-white p-5">
            <Text className="text-xl text-semibold text-[#101828]">Product Support</Text>
            <Text className="text-lg text-semibold text-[#4A5565]">Get help with your products</Text>
          </View> 
          <View className="rounded-2xl flex gap-3 shadow bg-white p-5">
            <Text className="text-xl text-semibold text-[#101828]">Account Setting</Text>
            <Text className="text-lg text-semibold text-[#4A5565]">Manage your account</Text>
          </View>
        </View>

        </ScrollView>
    </View>
  );
}
