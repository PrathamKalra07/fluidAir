import React from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, Touchable, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import fluidAirLogo from '../../assets/fluidAirLogo.png';
export default function Login() {
  const navigation = useNavigation();

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Welcome Orders!</Text>
    //   <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    // </View>
    
    <View>
      
    <LinearGradient
          colors={['#80062e', '#000000']}
          end={{ x: 0, y: 1 }}
          start={{ x: 0, y: 0.5}}
          style={styles.container}
        >
          <View className='flex-1 items-center justify-center'>
            <View className='bg-white rounded-xl w-40 h-20 justify-center items-center my-4'>
              <Image source={fluidAirLogo} ></Image>
            </View>
              <Text className='text-white text-2xl font-semibold my-4'>Welcome Back</Text>
              <Text className='text-rose-100 my-4'>Sign In To Continue</Text>
          </View>

    </LinearGradient>



      <View className="px-8 py-6 w-[90%] mx-auto mt-4">
        <Text className="text-black text-base mb-2 ml-2">Email</Text>
        <TextInput
          placeholder="your.email@example.com"
          placeholderTextColor="#888"
          className="border border-gray-400 rounded-xl px-3 py-2 text-black"
        />

      <Text className="text-black text-base mb-2 ml-2 mt-5">Password</Text>
        <TextInput
          placeholder="Enter Your Password"
          placeholderTextColor="#888"
          className="border border-gray-400 rounded-xl px-3 py-2 text-black"
        />

      <Text className='text-rose-800 text-right my-4'>Forgot Password?</Text>

      <TouchableOpacity className='mx-auto bg-rose-900 p-3 rounded-xl w-full' onPress={()=>navigation.navigate('Profile')}><Text className='text-white text-center'>Sign In</Text></TouchableOpacity>

      <Text className='text-center my-4'>Or</Text>

      <TouchableOpacity className='mx-auto p-3 rounded-xl w-full border border-gray-400'><Text className='text-black text-center'>Continue With Google</Text></TouchableOpacity>
      <View className='mt-10'>
      <Text className='text-center'>Don't Have an Account? <Text className='text-rose-800' onPress={()=>navigation.navigate('Signup')}>Sign Up</Text></Text>
      </View>
      </View>
    </View>
  );
}
