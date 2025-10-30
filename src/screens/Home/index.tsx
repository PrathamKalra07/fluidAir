import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>
      <Button title="Go to Orders" onPress={() => navigation.navigate('Orders')} />
      <Button title="Go to Rest" onPress={() => navigation.navigate('Rest')} />
    </View>
  );
}
