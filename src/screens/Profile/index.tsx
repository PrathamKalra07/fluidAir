// import React from 'react';
// import { View, Text, Button, ScrollView } from 'react-native';
// import { styles } from './styles';
// import { useNavigation } from '@react-navigation/native';

// export default function Profile() {
//   const navigation = useNavigation();

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Welcome Profile!</Text>
//       {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}

//     </ScrollView>
//   );
// }

// import "../../../globals.css";
import React, { useEffect } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import profileLogo from '../../assets/profileLogo.png';
import { styles } from './styles';
import { getAccountDetails } from '../../api/orders.api';
// import { MapPin } from 'lucide-react-native';

export default function Profile() {



  return (
    <ScrollView className="">
      {/* <Text className="font-extrabold text-green-200">Welcome Profile!</Text> */}

      <View className=" w-[80%] mx-auto px-2 py-5 border-gray-400 border rounded-xl overflow-visible mt-5">
        <View className="flex-1 flex-row justify-evenly items-center">
          <View className="">
            <Image className="h-28 w-28" source={profileLogo}></Image>
          </View>
          <View className="">
            <Text className="text-black align-middle w-52 text-3xl font-medium">
              John Doe
            </Text>
            <Text className="text-gray-600">Acme Corporation</Text>
          </View>
        </View>
        <View className="border-b border-gray-400 w-[85%] mx-auto my-5"></View>
        <View>
          <View className="">
            <View className="w-[90%] mx-auto mb-5">
              <Text className="text-sm text-gray-500">Email Address</Text>
              <Text className="text-xl">john.doe@example.com</Text>
            </View>
            <View className="w-[90%] mx-auto mb-5">
              <Text className="text-sm text-gray-500">Phone Number</Text>
              <Text className="text-xl">+1 (555) 123-4567</Text>
            </View>
            <View className="w-[90%] mx-auto mb-5">
              <Text className="text-sm text-gray-500">Address</Text>
              <Text className="text-xl">123 Main Street, Suite 100</Text>
              <Text className="text-xl">New York, NY 10001</Text>
            </View>
            <View className='mb-3'>
              <TouchableOpacity className='mx-auto bg-[#80062e] p-3 rounded-xl'><Text className='text-white'>Edit Profile</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View className='w-[80%] mx-auto my-4 p-1 px-2'>
        <Text className='font-medium text-lg'>
          Installed Products
        </Text>
      </View>
      <View className='border border-gray-400 w-[80%] mx-auto rounded-xl py-2 px-4 mb-4'>
        <Text className='text-lg font-medium my-1'>PRO-2451</Text>
        <Text className='text-sm font-medium my-1'>Industrial Air Compressor - 50HP Variable Speed Drive</Text>
        <Text className='text-sm text-rose-900 font-medium my-1'>Main Manufacturing Facility</Text>
      </View>
      <View className='border border-gray-400 w-[80%] mx-auto rounded-xl py-2 px-4 mb-4'>
        <Text className='text-lg font-medium my-1'>PRO-2451</Text>
        <Text className='text-sm font-medium my-1'>Industrial Air Compressor - 50HP Variable Speed Drive</Text>
        <Text className='text-sm text-rose-900 font-medium my-1'>Main Manufacturing Facility</Text>
      </View>

      <View className='border border-gray-400 w-[80%] mx-auto rounded-xl py-2 px-4 mb-4'>
        <Text className='text-lg font-medium my-1'>PRO-2451</Text>
        <Text className='text-sm font-medium my-1'>Industrial Air Compressor - 50HP Variable Speed Drive</Text>
        <Text className='text-sm text-rose-900 font-medium my-1'>Main Manufacturing Facility</Text>
      </View>

    </ScrollView>
  );
}
