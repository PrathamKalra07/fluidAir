import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import ContactInfoIcon from '../../assets/contactInfoIcon.svg';

export default function Contact() {
  const navigation = useNavigation();

  return (
    <View className="flex p-6 gap-4">
      <Text className="text-xl text-semibold">Contact Us</Text>

      <View className="bg-white rounded-2xl p-6 flex gap-10 shadow-lg">
        <View className="flex gap-2">
          <Text className="text-semibold text-xl text-[#101828]">Get in Touch</Text>
          <Text className=" text-lg text-[#4A5565]">
            We're here to help! Reach out to us through any of the following
            channels.
          </Text>
        </View>

        <View className="flex gap-6">
          <View className="flex flex-row gap-3.5">
            <ContactInfoIcon height={45} width={45} />
            <View className="flex gap-0.5">
              <Text className="text-semibold text-xl">Email</Text>
              <Text className=" text-lg text-[#4A5565]">support@fluidaire.com</Text>
            </View>
          </View>
          <View className="flex flex-row gap-3.5">
            <ContactInfoIcon height={45} width={45} />
            <View className="flex gap-0.5">
              <Text className="text-semibold text-xl">Phone</Text>
              <Text className=" text-lg text-[#4A5565]">1-800-FLUID-AIRE</Text>
            </View>
          </View>
          <View className="flex flex-row gap-3.5">
            <ContactInfoIcon height={45} width={45} />
            <View className="flex gap-0.5">
              <Text className="text-semibold text-xl">Hours</Text>
              <Text className=" text-lg text-[#4A5565]">Mon-Fri: 9AM - 6PM EST</Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
}
