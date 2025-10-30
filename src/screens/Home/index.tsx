import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from '../../components/NavigationBar';
import Profile from '../Profile';
import Orders from '../Orders';
import Help from '../Help';
import Contact from '../Contact';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("profile");

  const navigation = useNavigation();
  // useEffect(()=>{
    // renderScreen();
  // },[])

  const renderScreen = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "orders":
        return <Orders />;
      case "help":
        return <Help />;
      case "contact":
        return <Contact />;
      default:
        return <Profile />;
    }
  };


  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome Home!</Text> */}
      {/* <Button title="Go to Login" onPress={() => navigation.navigate('Login')} /> */}
      {/* <Button title="Go to Rest" onPress={() => navigation.navigate('Rest')} /> */}

      <View style={{width:'100%'}}><NavigationBar /></View>

      <View className='pt-[140] pb-[100]' >{renderScreen()}</View>

       <View style={styles.bottomNavbar}>
            {/* <Text style={styles.title}>Welcome Orders!</Text> */}
            <Button title="Profile" onPress={()=>setActiveTab('profile')} />
            <Button title="Orders" onPress={()=>setActiveTab('orders')} />
            <Button title="Help" onPress={()=>setActiveTab('help')} />
            <Button title="Contact" onPress={()=>setActiveTab('contact')} />
            <Button title="Rest" onPress={()=>navigation.navigate('Rest')} />

          </View>
    </View>
  );
}
