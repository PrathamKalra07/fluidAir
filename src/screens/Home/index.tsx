import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from '../../components/NavigationBar';
import Profile from '../Profile';
import Orders from '../Orders';
import Help from '../Help';
import Contact from '../Contact';
import { fetchUserSessionId } from '../../api/restUtils';
import { getAccountDetails, getAccountProducts } from '../../api/orders.api';
import profile2 from '../../assets/profile2.png';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('profile');
  const [sessionId, setSessionId] = useState('');
  const [account, setAccount] = useState<Record<string, any> | null>(null);
  const [products, setProducts] = useState<Record<string, any>[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = {
    email: 'aaron@plastechengineering.com',
    name: 'Plas-Tech Engineering ',
  };

  const navigation = useNavigation();

  const loadData = async () => {
    try {
      setIsLoading(true);

      const sessionRes = await fetchUserSessionId();
      const token = sessionRes.data;
      setSessionId(token);
      console.log('Session ID:', token);

      const accountData = await getAccountDetails(token, userInfo);
      setAccount(accountData);
      console.log('Account:', accountData);

      const productsData = await getAccountProducts(token, accountData);
      setProducts(productsData);
      console.log('Products:', productsData);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile account={account} products={products} />;
      case 'orders':
        return <Orders />;
      case 'help':
        return <Help />;
      case 'contact':
        return <Contact />;
      default:
        return <Profile />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <NavigationBar />
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#80062e" />
          <Text className="text-gray-500 mt-3">Loading data from Salesforce...</Text>
        </View>
      ) : (
        <>
          <View className="pt-[120] pb-[100]">{renderScreen()}</View>

          <View className="border-t border-gray-400 pb-5" style={styles.bottomNavbar}>
            <TouchableOpacity className='bg-rose-100 p-2 rounded-3xl w-[21%]' onPress={() => setActiveTab('profile')}><Image className='mx-auto w-8 h-8' source={profile2}></ Image><Text className='text-rose-800 font-medium text-center'>Profile</Text></TouchableOpacity>
            <TouchableOpacity className='bg-rose-100 p-2 rounded-3xl w-[21%]' onPress={() => setActiveTab('orders')}><Image className='mx-auto w-8 h-8' source={profile2}></ Image><Text className='text-rose-800 font-medium text-center'>Orders</Text></TouchableOpacity>

              <TouchableOpacity className='bg-rose-100 p-2 rounded-3xl w-[21%]' onPress={() => setActiveTab('help')}><Image className='mx-auto w-8 h-8' source={profile2}></ Image><Text className='text-rose-800 font-medium text-center'>Help</Text></TouchableOpacity>

              <TouchableOpacity className='bg-rose-100 p-2 rounded-3xl w-[21%]' onPress={() => setActiveTab('contact')}><Image className='mx-auto w-8 h-8' source={profile2}></ Image><Text className='text-rose-800 font-medium text-center'>Contact</Text></TouchableOpacity>
            {/* <Button title="Rest" onPress={() => setActiveTab('Rest')} /> */}
          </View>
        </>
      )}
    </View>
  );
}
