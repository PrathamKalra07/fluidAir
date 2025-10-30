import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import fluidAirLogo from '../../assets/fluidAirLogo.png';
import logoutIcon from '../../assets/logoutIcon.png';

export default function NavigationBar() {
  const navigation = useNavigation();

  return (
    // <View style={styles.container}>
    <LinearGradient
      colors={['#AD033B', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* <Text style={styles.span}>Welcome Back!</Text> */}
      <View style={{width:120, marginTop:35,flex:1,flexDirection:'row'}}>
      <View style={{backgroundColor:"white",borderRadius:15}}>
      <Image source={fluidAirLogo} width={100}></Image>
      </View>
      <View style={{marginLeft:'10',marginTop:'5'}}>
        <Text style={{fontSize : 12, color:'white'}}>Welcome Back</Text>
        <Text style={{color:'white',fontSize:18}}>John Doe</Text>
      </View>
      </View>
      <View style={{marginTop:'35'}}>
        <Image source={logoutIcon} width={100}></Image>
      </View>
    </LinearGradient>
  );
}
