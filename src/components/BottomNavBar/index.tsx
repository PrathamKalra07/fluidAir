import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavigationTab } from '../../context/NavigationContext';
import { styles } from './styles';

// SVG icons
import Profile2 from '../../assets/profile2.svg';
import Profile2Black from '../../assets/profile2black.svg';
import OrdersBlack from '../../assets/ordersBlack.svg';
import OrdersRed from '../../assets/ordersRed.svg';
import HelpRed from '../../assets/helpRed.svg';
import HelpBlack from '../../assets/helpBlack.svg';
import ContactRed from '../../assets/contactRed.svg';
import ContactBlack from '../../assets/contactBlack.svg';

// --------------------------------------------------------------------
// 👇 TabButton: ultra-light, memoized, stable props
// --------------------------------------------------------------------
const TabButton = memo(
  ({ id, label, ActiveIcon, InactiveIcon, isActive, onPress }: any) => {
    const Icon = isActive ? ActiveIcon : InactiveIcon;

    return (
      <TouchableOpacity
        onPress={() => onPress(id)}
        activeOpacity={0.8}
        style={{
          backgroundColor: isActive ? '#ffe4e6' : 'transparent',
          borderRadius: 30,
          paddingVertical: 6,
          alignItems: 'center',
          width: '21%',
        }}
      >
        <Icon width={36} height={26} />
        <Text
          style={{
            color: isActive ? '#7f1d1d' : '#6b7280',
            fontSize: 12,
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  },
  (prev, next) => prev.isActive === next.isActive // re-render only when active state changes
);

// --------------------------------------------------------------------
// 👇 BottomNavBar: stable callbacks + no re-renders on context updates
// --------------------------------------------------------------------
const BottomNavBar = () => {
  const { activeTab, setActiveTab } = useNavigationTab();
  const navigation = useNavigation();

  // ✅ useCallback ensures handleTabPress has a stable reference
  const handleTabPress = useCallback(
    (tab: 'profile' | 'orders' | 'help' | 'contact') => {
      if (tab !== activeTab) {
        setActiveTab(tab);
        // Optional: navigate if needed — can skip for pure tab switch speed

        navigation.navigate('Home' as never);
      }
    },
    [activeTab, setActiveTab]
  );

  return (
    <View
      style={[
        styles.bottomNavbar,
        {
          borderTopWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-around',
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 5,
          elevation: 5,
          paddingVertical: 10,
        },
      ]}
    >
      <TabButton
        id="profile"
        label="Profile"
        ActiveIcon={Profile2}
        InactiveIcon={Profile2Black}
        isActive={activeTab === 'profile'}
        onPress={handleTabPress}
      />
      <TabButton
        id="orders"
        label="Orders"
        ActiveIcon={OrdersRed}
        InactiveIcon={OrdersBlack}
        isActive={activeTab === 'orders'}
        onPress={handleTabPress}
      />
      <TabButton
        id="help"
        label="Help"
        ActiveIcon={HelpRed}
        InactiveIcon={HelpBlack}
        isActive={activeTab === 'help'}
        onPress={handleTabPress}
      />
      <TabButton
        id="contact"
        label="Contact"
        ActiveIcon={ContactRed}
        InactiveIcon={ContactBlack}
        isActive={activeTab === 'contact'}
        onPress={handleTabPress}
      />
    </View>
  );
};

export default memo(BottomNavBar);
