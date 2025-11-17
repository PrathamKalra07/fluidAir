import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAccountData } from '../../store/slices/accountSlice';
import BottomNavBar from '../../components/BottomNavBar';
import Profile from '../Profile';
import Orders from '../Orders';
import Contact from '../Contact';
import { styles } from './styles';
import { useNavigationTab } from '../../context/NavigationContext';
import Service from '../Service';

let hasFetched = false;


export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { activeTab } = useNavigationTab();
  const { account, products, loading, error } = useSelector(
    (state: RootState) => state.account,
    shallowEqual
  );

  const [tabLoading, setTabLoading] = useState(false);
  const [loadedTabs, setLoadedTabs] = useState<string[]>(['profile']); // only profile preloaded

  // const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetched) {
      hasFetched = true;
      dispatch(
        fetchAccountData({
          email: 'johndoe@example.com',
          name: 'Plas-Tech Engineering',
        })
      );
    }
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => sub.remove();
    }, [])
  );

  useEffect(() => {
    if (!loadedTabs.includes(activeTab)) {
      setTabLoading(true);

      setTimeout(() => {
        setLoadedTabs((prev) => [...prev, activeTab]);
        setTabLoading(false);
      }, 500); // feels instant; still async
    }
  }, [activeTab]);

  const renderScreen = () => {
    if (tabLoading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#80062e" />
          <Text className="text-gray-500 mt-3">Loading {activeTab}...</Text>
        </View>
      );
    }

    switch (activeTab) {
      case 'profile':
        return <Profile account={account} products={products} />;
      case 'orders':
        return <Orders account={account} />;
      case 'service':
        return <Service />;
      case 'contact':
        return <Contact />;
      default:
        return <Profile account={account} products={products} />;
    }
  };

  // 🔹 If initial account load is pending
  if (loading && !account) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#80062e" />
        <Text className="text-gray-500 mt-3">Loading data from Salesforce...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red' }}>Error loading data: {error}</Text>
      </View>
    );
  }

  // 🔹 Main UI
  return (
    <View style={styles.container}>
      <View style={{ flex: 1,  paddingBottom: 90 }}>
        {renderScreen()}
      </View>

      <BottomNavBar />
    </View>
  );
}
