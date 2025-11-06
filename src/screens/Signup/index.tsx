// import React from 'react';
// import { View, Text, Button, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// import { styles } from './styles';
// import { useNavigation } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import fluidAirLogo from '../../assets/fluidAirLogo.png';
// export default function Signup() {
//   const navigation = useNavigation();

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // moves view up
//       style={{ flex: 1 }}
//     >

//     <ScrollView
//         contentContainerStyle={{ flexGrow: 1 }}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         >

//     <LinearGradient
//           colors={['#80062e', '#000000']}
//           end={{ x: 0, y: 1 }}
//           start={{ x: 0, y: 0.5}}
//           style={styles.container}
//           >
//           <View className='flex-1 items-center justify-center'>
//             <View className='bg-white rounded-xl w-40 h-20 justify-center items-center my-4'>
//               <Image source={fluidAirLogo} ></Image>
//             </View>
//               <Text className='text-white text-2xl font-semibold my-4'>Welcome Back</Text>
//               <Text className='text-rose-100 my-4'>Sign In To Continue</Text>
//           </View>

//     </LinearGradient>

//       <View className="px-8 py-6 w-[90%] mx-auto mt-0">
//         <Text className="text-black text-base mb-2 ml-2">First Name</Text>
//         <TextInput
//           placeholder="Enter Your First Name"
//           placeholderTextColor="#888"
//           className="border border-gray-400 rounded-xl px-3 py-2 text-black"
//           />

//       <Text className="text-black text-base mb-2 ml-2 mt-5">Last Name</Text>
//         <TextInput
//           placeholder="Enter Your Last Name"
//           placeholderTextColor="#888"
//           className="border border-gray-400 rounded-xl px-3 py-2 text-black"
//         />

// <Text className="text-black text-base mb-2 ml-2 mt-5">Email</Text>
//         <TextInput
//           placeholder="your.email@example.com"
//           placeholderTextColor="#888"
//           className="border border-gray-400 rounded-xl px-3 py-2 text-black"
//           />

//         <Text className="text-black text-base mb-2 ml-2 mt-5">Password</Text>
//         <TextInput
//           placeholder="Create a Password"
//           placeholderTextColor="#888"
//           className="border border-gray-400 rounded-xl px-3 py-2 text-black"
//           />

//       <TouchableOpacity className='mx-auto bg-rose-900 p-3 rounded-xl w-full mt-8' onPress={()=>navigation.navigate('Home')}><Text className='text-white text-center'>Sign Up</Text></TouchableOpacity>

//       <Text className='text-center my-4'>Or</Text>

//       <TouchableOpacity className='mx-auto p-3 rounded-xl w-full border border-gray-400'><Text className='text-black text-center'>Continue With Google</Text></TouchableOpacity>
//       <View className='mt-10'>
//       <Text className='text-center'>Already have an Account? <Text className='text-rose-800' onPress={()=>navigation.navigate('Login')}>Sign In</Text></Text>
//       </View>
//       </View>
//     </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  findNodeHandle,
  UIManager,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import fluidAirLogo from '../../assets/fluidAirLogo.png';
import EmailSvg from '../../assets/email.svg';
import GoogleSvg from '../../assets/google.svg';
import LockSvg from '../../assets/lock.svg';
import EyeSvg from '../../assets/eye.svg';
import ProfileSvg from '../../assets/profile.svg';

export default function Signup() {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const scrollToFocusedInput = (reactNode: any) => {
    // Smoothly scrolls the focused input into view
    UIManager.measureLayout(
      reactNode,
      findNodeHandle(scrollRef.current),
      () => {},
      (x, y) => {
        scrollRef.current?.scrollTo({ y: y - 100, animated: true });
      },
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      className="bg-white h-full"
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={isKeyboardVisible}
      >
        <LinearGradient
          colors={['#80062e', '#000000']}
          end={{ x: 0, y: 1 }}
          start={{ x: 0, y: 0.5 }}
          style={styles.container}
        >
          <View className="flex-1 items-center justify-center">
            <View className="bg-white rounded-xl w-40 h-20 justify-center items-center my-4">
              <Image source={fluidAirLogo} />
            </View>
            <Text className="text-white text-2xl font-semibold my-4">
              Welcome Back
            </Text>
            <Text className="text-rose-100 my-4">Sign In To Continue</Text>
          </View>
        </LinearGradient>

        <View className="w-full p-12 flex flex-col gap-4">
          <View className="flex flex-col gap-1">
            <Text className="text-black text-base pl-1">First Name</Text>
            <View className="border border-gray-400 rounded-xl px-3 text-black flex flex-row items-center gap-1">
              <ProfileSvg />
              <TextInput
                placeholder="Enter Your First Name"
                placeholderTextColor="#888"
                className="text-black"
              />
            </View>
          </View>

          <View className="flex flex-col gap-1">
            <Text className="text-black text-base pl-1">Last Name</Text>
            <View className="border border-gray-400 rounded-xl px-3 text-black flex flex-row items-center gap-1">
              <ProfileSvg />
              <TextInput
                placeholder="Enter Your Last Name"
                placeholderTextColor="#888"
                className="text-black"
              />
            </View>
          </View>

          <View className="flex flex-col gap-1">
            <Text className="text-black text-base pl-1">Email</Text>
            <View className="border border-gray-400 rounded-xl px-3 text-black flex flex-row items-center gap-1">
              <EmailSvg />
              <TextInput
                placeholder="your.email@example.com"
                placeholderTextColor="#888"
                className="text-black"
              />
            </View>
          </View>

          <View className="flex flex-col gap-1">
            <Text className="text-black text-base pl-1">Password</Text>
            <View className="border border-gray-400 rounded-xl px-3 text-black flex flex-row items-center gap-1">
              <LockSvg />
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor="#888"
                className="text-black flex-1"
              />
              <EyeSvg className="relative right-0" />
            </View>
          </View>

          <TouchableOpacity
            className="mx-auto bg-rose-900 p-3 rounded-xl w-full mt-2"
            onPress={() => navigation.navigate('Home')}
          >
            <Text
              className="text-white text-center"
              onPress={() => navigation.navigate('Login')}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <View className="relative py-4 flex items-center">
            <View className="border-b border-b-gray-200 w-full"/>
            <Text className="absolute text-center bg-white top-1 w-[50%]">
              Or continue with
            </Text>
          </View>

          <TouchableOpacity className="py-3 rounded-2xl w-full border border-gray-300 flex flex-row justify-center gap-2 items-center">
            <GoogleSvg />
            <Text className="text-black text-center">Continue With Google</Text>
          </TouchableOpacity>

          <View className="mt-4">
            <Text className="text-center">
              Already have an Account?{' '}
              <Text
                className="text-rose-800"
                onPress={() => navigation.navigate('Login')}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
