import React, { useEffect, useState, useRef, memo } from 'react';
import { View, Animated } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import BottomNavBar from '../components/BottomNavBar';
import NavigationBar from '../components/NavigationBar';
import { fetchUserSessionId, getAccountDetails, getAccountProducts, getAllAccountOrder } from '../api/orders.api';

const MemoTop = memo(NavigationBar);
const MemoBottom = memo(BottomNavBar);

export default function AppNavigator() {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState<string>('Splash');
  const hideNavbarRoutes = ['Splash', 'Login', 'Signup', 'Rest'];
  const [account, setAccount] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(null);
  const [sessionId, setSessionId] = useState('');

  const topOpacity = useRef(new Animated.Value(1)).current;
  const bottomOpacity = useRef(new Animated.Value(1)).current;

  const fadeBars = (visible: boolean) => {
    Animated.parallel([
      Animated.timing(topOpacity, {
        toValue: visible ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bottomOpacity, {
        toValue: visible ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    (async () => {
      const token = (await fetchUserSessionId()).data;
      setSessionId(token);
      const acc = await getAccountDetails(token, { email: 'aaron@plastechengineering.com', name: 'Plas-Tech Engineering' });
      setAccount(acc);
      setProducts(await getAccountProducts(token, acc));
      setOrders(await getAllAccountOrder(token, acc));
    })();
  }, []);

  const handleRouteChange = () => {
    const route = navigationRef.getCurrentRoute()?.name || '';
    setCurrentRoute(route);
    requestAnimationFrame(() => fadeBars(!hideNavbarRoutes.includes(route)));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* top bar */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          opacity: topOpacity,
        }}
      >
        <MemoTop account={account} navigation={navigationRef} />
      </Animated.View>

      <NavigationContainer ref={navigationRef} onStateChange={handleRouteChange}>
        <StackNavigator account={account} products={products} orders={orders} sessionId={sessionId} />
      </NavigationContainer>

      {/* bottom bar */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          opacity: bottomOpacity,
        }}
      >
        <MemoBottom navigation={navigationRef} />
      </Animated.View>
    </View>
  );
}
