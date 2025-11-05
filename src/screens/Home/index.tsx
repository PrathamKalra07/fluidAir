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
import { getAccountDetails, getAccountProducts, getAllAccountOrder, getChildOrders } from '../../api/orders.api';
import Profile2 from '../../assets/profile2.svg';
import Profile2Black from '../../assets/profile2black.svg';
import OrdersBlack from '../../assets/ordersBlack.svg';
import OrdersRed from '../../assets/ordersRed.svg';
import HelpRed from '../../assets/helpRed.svg';
import HelpBlack from '../../assets/helpBlack.svg';
import ContactRed from '../../assets/contactRed.svg';
import ContactBlack from '../../assets/contactBlack.svg';
import OrderDetails from '../OrderDetails';
import OrderLineItems from '../OrderLineItems';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('profile');
  const [sessionId, setSessionId] = useState('');
  const [account, setAccount] = useState<Record<string, any> | null>(null);
  const [products, setProducts] = useState<Record<string, any>[]>([]);
  const [orders,setOrders]= useState<Record<string,any>[]>([]);
  const [orderDetail,setOrderDetail]= useState<Record<string,any> | null>(null);
  const [orderItems,setOrderItems] = useState<Record<string,any>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = {
    email: 'aaron@plastechengineering.com',
    // email  : 'bmay@anchorabrasives.com',
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

      const ordersData = await getAllAccountOrder(token,accountData);
      setOrders(ordersData);
      console.log('orders:',ordersData);

      // const childOrders = await getChildOrders(token,)

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
        return <Orders account={account} orders={orders} openOrderDetails={openOrderDetails} />;
      case 'help':
        return <Help />;
      case 'contact':
        return <Contact />;
      case 'orderDetail':
        return <OrderDetails order={orderDetail} backToOrder={backToOrder} />
      case 'orderLinkItems':
        return <OrderLineItems items={} backToDetails={backToDetails} />
      default:
        return <Profile account={account} products={products} />;
    }
  };

  const getOrderItems = () =>{

  }

  const getOrderChild = () =>{

  }


  const openOrderDetails = (order)=>{
    setOrderDetail(order);
    setActiveTab('orderDetail');
  }

  const backToOrder = () =>{
    setOrderDetail(null);
    setActiveTab('orders');
  }

  const backToDetails = () =>{
    setActiveTab('orderDetail')
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <NavigationBar account={account} />
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#80062e" />
          <Text className="text-gray-500 mt-3">Loading data from Salesforce...</Text>
        </View>
      ) : (
        <>
          <View className="pt-[120] pb-[90]">{renderScreen()}</View>

          <View className="border-t border-gray-400 pb-5" style={styles.bottomNavbar}>
            <TouchableOpacity className={activeTab==='profile'?'bg-rose-100 p-2 rounded-3xl w-[21%] items-center':'p2 w-[21%] items-center'} onPress={() => setActiveTab('profile')}>{activeTab==='profile'?<Profile2 width={36} height={26} />:<Profile2Black width={36} height={26}/>}<Text className={activeTab==='profile'?'text-rose-800 font-medium text-center text-xs':'text-gray-600 text-center font-medium text-xs'}>Profile</Text></TouchableOpacity>

            <TouchableOpacity className={activeTab==='orders'?'bg-rose-100 p-2 rounded-3xl w-[21%] items-center':'p2 w-[21%] items-center'} onPress={() => setActiveTab('orders')}>{activeTab==='orders'?<OrdersRed width={36} height={26} />:<OrdersBlack width={36} height={26}/>}<Text className={activeTab==='orders'?'text-rose-800 font-medium text-center text-xs':'text-gray-600 text-center font-medium text-xs'}>Orders</Text></TouchableOpacity>

              <TouchableOpacity className={activeTab==='help'?'bg-rose-100 p-2 rounded-3xl w-[21%] items-center':'p2 w-[21%] items-center'} onPress={() => setActiveTab('help')}>{activeTab==='help'?<HelpRed width={36} height={26} />:<HelpBlack width={36} height={26}/>}<Text className={activeTab==='help'?'text-rose-800 font-medium text-center text-xs':'text-gray-600 text-center font-medium text-xs'}>Help</Text></TouchableOpacity>

              <TouchableOpacity className={activeTab==='contact'?'bg-rose-100 p-2 rounded-3xl w-[21%] items-center':'p2 w-[21%] items-center'} onPress={() => setActiveTab('contact')}>{activeTab==='contact'?<ContactRed width={36} height={26} />:<ContactBlack width={36} height={26}/>}<Text className={activeTab==='contact'?'text-rose-800 font-medium text-center text-xs':'text-gray-600 text-center font-medium text-xs'}>Contact</Text></TouchableOpacity>

          </View>
        </>
      )}
    </View>
  );
}
