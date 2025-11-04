import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
// import logoutIcon from '../../assets/logoutIcon.png';
import Profile2White from '../../assets/profile2White.svg';
import DownArrow from '../../assets/downarrowWhite.svg';
import { TouchableWithoutFeedback } from 'react-native';

type navigationBarProps = {
  account: Record<string,any> | null;
}

export default function NavigationBar({ account }: navigationBarProps) {
  const navigation = useNavigation();
  const [logoutVisible,setLogoutVisible] = useState(false);

  return (

    // <View style={styles.container}>
    <LinearGradient
      colors={['#80062e', '#000000']}
      end={{ x: 0, y: 1 }}
      start={{ x: 0, y: 0.5}}
      style={styles.container}
    >
      {/* <Text style={styles.span}>Welcome Back!</Text> */}
      <View style={{width:120, marginTop:35,flex:1,flexDirection:'row'}}>
      {/* <View style={{backgroundColor:"white",borderRadius:15}}>
      <Image source={fluidAirLogo} width={100}></Image>
      </View> */}
      <View style={{marginLeft:'10',marginTop:'5'}}>
        <Text style={{fontSize : 12, color:'white'}}>Welcome Back</Text>
        <Text style={{color:'white',fontSize:18}}>{account?.Primary_Contact__r.Name}</Text>
      </View>
      </View>
      <TouchableOpacity onPress={()=>{logoutVisible?setLogoutVisible(false):setLogoutVisible(true)}} className='flex-1 flex-row justify-end' style={{marginTop:'35'}}>
        {/* <Image source={logoutIcon} width={100}></Image> */}
        <Profile2White height={30} width={30} />
        <View className='self-end mb-1'>
        <DownArrow className='flex-1 flex-col justify-end items-end' height={18} width={18} />
        </View>
        
      </TouchableOpacity>
      {logoutVisible && (
        <>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}  className='absolute top-[100] right-[0] bg-rose-800 py-4 px-8 z-50 rounded-xl'>
            <Text className='text-white font-medium'>Sign Out</Text>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={()=>{setLogoutVisible(false)}} >
            <View className='w-[100vh] h-[200vh] absolute z-40 '></View>
          </TouchableWithoutFeedback>
        </>
      )}
    </LinearGradient>
  );
}
