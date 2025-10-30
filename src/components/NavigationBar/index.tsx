import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function NavigationBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome Orders!</Text> */}
      <Button title="Profile" />
      <Button title="Orders" />
      <Button title="Help" />
      <Button title="Contact" />
    </View>
  );
}
