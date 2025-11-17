import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
// import logoutIcon from '../../assets/logoutIcon.png';
import Profile2White from '../../assets/profile2White.svg';
import DownArrow from '../../assets/downarrowWhite.svg';
import SignOutSvg from '../../assets/signout.svg';
import { TouchableWithoutFeedback } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../store/store';


export default function NavigationBar() {

  const account = useSelector((state: RootState) => state.account.accountName, shallowEqual);
  const navigation = useNavigation();
  const [logoutVisible,setLogoutVisible] = useState(false);



  return (

    // <View style={styles.container}>
    <LinearGradient
      colors={['#80062e', '#000000']}
      end={{ x: 0, y: 1 }}
      start={{ x: 0, y: 0.5}}
      
      // style={styles.container}
      className='h-[15%]'
    >
      <View className='h-full flex flex-row justify-between items-end px-8 py-6 relative bottom-0'>
        <View>
            <Text style={{fontSize : 12, color:'white'}}>Welcome Back</Text>
            <Text style={{color:'white',fontSize:18}}>{account}</Text>
        </View>

        <TouchableOpacity onPress={()=>{logoutVisible?setLogoutVisible(false):setLogoutVisible(true)}}  className='flex flex-row'>
          <Profile2White height={25} width={25} />
          
          <View className='self-end mb-1'>
            <DownArrow className='flex-1 flex-col justify-end items-end' height={18} width={18} />
          </View>
          
        </TouchableOpacity>


        {logoutVisible && (
          <>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{zIndex : 9999}}  className='absolute shadow bg-white top-[120] right-[10] bg-rose-800 py-3 px-8 z-50 rounded-xl flex flex-row gap-4 items-center border border-gray-200'>
              <SignOutSvg />
              <Text className='text-red-500 font-medium'>Sign Out</Text>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={()=>{setLogoutVisible(false)}} style={{zIndex : 9999}}>
              <View className='w-[100vh] h-[200vh] absolute z-40 '></View>
            </TouchableWithoutFeedback>
          </>
        )}
      </View>
    </LinearGradient>
  );
}
