import React from 'react';
import { View, Text, Button , ScrollView , StatusBar, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { RequestService } from '../../components/RequestService';

export default function Service() {
  const navigation = useNavigation();

  return (

     <View className="p-4 gap-4">
        <Text className="text-xl font-medium ">Service Request</Text>

        {/* <View className="gap-4 flex flex-col">
          <View className="rounded-2xl flex gap-3 shadow bg-white">
            <View className='border-b border-gray-300 p-5'>
            <Text className="text-xl font-semibold text-[#101828]">Request Your Service</Text>
            </View>
            <View>
              <View>
                <TouchableOpacity>

                </TouchableOpacity>
              </View>
              
            </View>

          </View> 
        </View> */}
        <View className='mt-2'>
        <RequestService />
        </View>
    </View>
  );
}
