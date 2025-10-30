import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';


export default function Rest() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Rest!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Rest')} />
    </View>
  );
}
