import React from 'react';
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
      <Text style={styles.title}>Welcome Home!</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      {/* <Button title="Go to Rest" onPress={() => navigation.navigate('Rest')} /> */}
      <NavigationBar  />
    </View>
  );
}
