import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  Touchable,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import fluidAirLogo from '../../assets/fluidAirLogo.png';

import EmailSvg from '../../assets/email.svg';
import GoogleSvg from '../../assets/google.svg';
import LockSvg from '../../assets/lock.svg';
import EyeSvg from '../../assets/eye.svg';

export default function Login() {
  const navigation = useNavigation();

  return (
    <View className="h-full bg-white">
      <LinearGradient
        colors={['#80062e', '#000000']}
        end={{ x: 0, y: 1 }}
        start={{ x: 0, y: 0.5 }}
        style={styles.container}
      >
        <View className="flex-1 items-center justify-center">
          <View className="bg-white rounded-xl w-40 h-20 justify-center items-center my-4">
            <Image source={fluidAirLogo}></Image>
          </View>
          <Text className="text-white text-2xl font-semibold my-4">
            Welcome Back
          </Text>
          <Text className="text-rose-100 my-4">Sign In To Continue</Text>
        </View>
      </LinearGradient>

      <View className="w-full p-12 flex flex-col gap-4">
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

        <Text className="text-rose-800 text-right ">Forgot Password?</Text>

        <TouchableOpacity
          className="bg-rose-900 p-3 rounded-xl w-full"
          onPress={() => navigation.navigate('Home')}
        >
          <Text className="text-white text-center">Sign In</Text>
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

        <View className="pt-4">
          <Text className="text-center text-gray-500">
            Don't Have an Account?{' '}
            <Text
              className="text-rose-800"
              onPress={() => navigation.navigate('Signup')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
