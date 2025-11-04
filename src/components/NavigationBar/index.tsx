import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Profile2White from '../../assets/profile2White.svg';
import DownArrow from '../../assets/downarrowWhite.svg';
import { styles } from './styles';

type NavigationBarProps = {
  account: Record<string, any> | null;
  navigation: any;
};

export default function NavigationBar({ account, navigation }: NavigationBarProps) {
  const [logoutVisible, setLogoutVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#80062e', '#000000']}
      end={{ x: 0, y: 1 }}
      start={{ x: 0, y: 0.5 }}
      style={styles.container}
    >
      <View style={{ width: 120, marginTop: 35, flexDirection: 'row', flex: 1 }}>
        <View style={{ marginLeft: 10, marginTop: 5 }}>
          <Text style={{ fontSize: 12, color: 'white' }}>Welcome Back</Text>
          <Text style={{ color: 'white', fontSize: 18 }}>
            {account?.Primary_Contact__r?.Name || 'User'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setLogoutVisible(!logoutVisible)}
        style={{ marginTop: 35, flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}
      >
        <Profile2White height={30} width={30} />
        <View style={{ alignSelf: 'flex-end', marginBottom: 4 }}>
          <DownArrow height={18} width={18} />
        </View>
      </TouchableOpacity>

      {logoutVisible && (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="absolute top-[100] right-[0] bg-rose-800 py-4 px-8 z-50 rounded-xl"
          >
            <Text className="text-white font-medium">Sign Out</Text>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={() => setLogoutVisible(false)}>
            <View className="w-[100vh] h-[200vh] absolute z-40" />
          </TouchableWithoutFeedback>
        </>
      )}
    </LinearGradient>
  );
}
