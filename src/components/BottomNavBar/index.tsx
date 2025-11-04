import React, { useState, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import Profile2 from '../../assets/profile2.svg';
import Profile2Black from '../../assets/profile2black.svg';
import OrdersBlack from '../../assets/ordersBlack.svg';
import OrdersRed from '../../assets/ordersRed.svg';
import HelpRed from '../../assets/helpRed.svg';
import HelpBlack from '../../assets/helpBlack.svg';
import ContactRed from '../../assets/contactRed.svg';
import ContactBlack from '../../assets/contactBlack.svg';

type BottomNavBarProps = {
  navigation: any;
};

export default function BottomNavBar({ navigation }: BottomNavBarProps) {
  const [activeTab, setActiveTab] = useState('profile');

  const handleNavigate = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      // Navigate instantly (no async lag)
      requestAnimationFrame(() => {
        navigation.navigate(tab.charAt(0).toUpperCase() + tab.slice(1));
      });
    },
    [navigation]
  );

  const NavButton = ({
    tab,
    ActiveIcon,
    InactiveIcon,
    label,
  }: {
    tab: string;
    ActiveIcon: React.FC<any>;
    InactiveIcon: React.FC<any>;
    label: string;
  }) => {
    const isActive = activeTab === tab;

    return (
      <Pressable
        onPressIn={() => handleNavigate(tab)} // ⚡ instant response
        unstable_pressDelay={0}
        android_ripple={null}
        style={{
          width: '22%',
          alignItems: 'center',
          padding: 8,
          borderRadius: 24,
          backgroundColor: isActive ? '#ffe4e6' : 'transparent', // rose-100
        }}
      >
        {isActive ? (
          <ActiveIcon width={36} height={26} />
        ) : (
          <InactiveIcon width={36} height={26} />
        )}
        <Text
          style={{
            color: isActive ? '#9f1239' : '#4b5563', // rose-800 vs gray-600
            fontSize: 12,
            fontWeight: '500',
            textAlign: 'center',
            marginTop: 2,
          }}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#d1d5db',
        backgroundColor: '#fff',
        paddingBottom: 12,
        paddingTop: 4,
      }}
      pointerEvents="box-none" // ensures touches pass instantly
    >
      <NavButton
        tab="profile"
        ActiveIcon={Profile2}
        InactiveIcon={Profile2Black}
        label="Profile"
      />
      <NavButton
        tab="orders"
        ActiveIcon={OrdersRed}
        InactiveIcon={OrdersBlack}
        label="Orders"
      />
      <NavButton
        tab="help"
        ActiveIcon={HelpRed}
        InactiveIcon={HelpBlack}
        label="Help"
      />
      <NavButton
        tab="contact"
        ActiveIcon={ContactRed}
        InactiveIcon={ContactBlack}
        label="Contact"
      />
    </View>
  );
}
