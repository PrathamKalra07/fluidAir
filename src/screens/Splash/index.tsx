import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
  const navigation = useNavigation();


  useEffect(()=>{
    const timer = setTimeout(()=>{
      // if user is logged in, navigate to home else navigate to login
      // if(!user){
        // navigation.navigate('Login');
      // }else{
        navigation.navigate('Home');
      // }r
    },1500);

    return () => clearTimeout(timer);
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash Screen</Text>
      {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
    </View>
  );
}
