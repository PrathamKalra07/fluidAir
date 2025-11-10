// import "../../../globals.css";
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import ProfileLogo from '../../assets/profileLogo.svg';
import { styles } from './styles';
import { getAccountDetails } from '../../api/orders.api';
import PinRed from '../../assets/pinRed.svg';
import { RootState } from '../../store/store';
import { shallowEqual, useSelector } from 'react-redux';
import SettingsWhite from '../../assets/settingsWhite.svg';
import { RequestService } from '../../components/RequestService';

export default function Profile() {
  const account = useSelector((state: RootState) => state.account.account, shallowEqual);
  const products = useSelector((state: RootState) => state.account.products, shallowEqual);

  const [selectedProducts,setSelectedProducts]=useState<Record<string,any>[]>([]);
  const [RequestServiceVisible,setRequestServiceVisible] = useState(false);
  

  const selectProducts = (product:Record<string,any>) =>{
    let updatedSelection = [...selectedProducts];
    const index = updatedSelection.findIndex((p) => p.Id === product.Id);
    if (index > -1) {
      // Product already selected, remove it
      updatedSelection.splice(index, 1);
    } else {
      // Product not selected, add it
      updatedSelection.push(product);
    }
    setSelectedProducts(updatedSelection);

    console.log('Selected Products : ',updatedSelection);

  }


  if (!account) return <Text>Loading account...</Text>;

  return (
    <>
    <ScrollView className=" flex flex-col p-8 gap-8"
    contentContainerClassName='pb-2'>
      {/* <Text className="font-extrabold text-green-200">Welcome Profile!</Text> */}

      <View className="shadow-xl bg-white rounded-2xl overflow-visible p-8 gap-4">
        <View className="flex flex-row justiy-evenly items-center gap-4">
          <View className="">
            <ProfileLogo height={75} width={75} />
          </View>

          <View className="">
            <Text className="text-black align-middle w-52 text-2xl font-medium">
              {account?.Primary_Contact__r.Name}
            </Text>
            <Text className="text-gray-600">{account?.Name}</Text>
          </View>
        </View>

        <View className="border-b border-b-gray-200 w-full mx-auto" />

        <View className="flex flex-col gap-3">
          <View className="">
            <Text className="text-sm text-gray-500">Email Address</Text>
            <Text className="text-xl">{account?.Primary_Contact_Email__c}</Text>
          </View>
          <View className="">
            <Text className="text-sm text-gray-500">Phone Number</Text>
            <Text className="text-xl">{account?.Primary_Contact_Phone__c}</Text>
          </View>
          <View className="">
            <Text className="text-sm text-gray-500">Address</Text>
            <Text className="text-xl">{account?.Mailing_Street__c}</Text>
            <Text className="text-xl">
              {account?.Mailing_City__c + ' - ' + account?.Mailing_ZIP__c}
            </Text>
          </View>
        </View>

        <View className="mt-4">
          <TouchableOpacity className="mx-auto bg-[#80062e] py-2.5 px-4 rounded-xl">
            <Text className="text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {products != null && products.length > 0 && (
        <View className="px-2 py-4 flex flex-row justify-between items-center">
          <Text className="font-regular text-xl text-[#101828]">Installed Products</Text>
          <TouchableOpacity onPress={()=>setRequestServiceVisible(true)} className="border border-red-800 p-2 rounded-xl">
            <Text className='text-red-800'>
              + Add New Product
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View className="flex flex-col gap-4 mb-12">
        {products != null && products.length > 0 ? (
          products?.map((product, index) => (
            <TouchableOpacity
              key={index}
              className={selectedProducts.includes(product)?"border border-red-700 py-2 px-4 bg-white rounded-xl":"border border-gray-300 rounded-xl py-2 px-4 bg-white"}
              onPress={() => selectProducts(product)}
            >
              <View className="flex flex-row justify-between items-center">
                <Text className="text-lg font-medium my-1">{product.Name}</Text>

                {product.Status__c === 'Active' ? (
                  <View className="flex flex-row items-center font-semibold">
                    <Text className="text-4xl  text-green-600">•</Text>
                    <Text className=" text-green-600">Active</Text>
                  </View>
                ) : (
                  <View className="flex flex-row items-center font-semibold">
                    <Text className="text-4xl  text-gray-600">•</Text>
                    <Text className=" text-gray-600">Inactive</Text>
                  </View>
                )}
              </View>

              <Text className="text-sm font-medium my-1">
                {product.Short_Description__c || 'No description available'}
              </Text>

              <View className="flex-1 flex-row items-center gap-1">
                <PinRed width={14} height={14} />

                <Text className="text-sm text-rose-900 font-medium my-1">
                  {product.FConnect__Site__r.Name || 'Unknown location'}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View>
            <View className="flex gap-4 p-6 items-center">
              <Text className="text-center text-lg text-[#101828] font-medium">
                No Installed Products
              </Text>
              <Text className="text-center w-[70%] text-[#6A7282]">
                You don't have any products installed at your facilities yet.
              </Text>
              <Text className="text-center w-[80%] text-[#6A7282]">
                Once you purchase and install equipment, it will appear here for
                easy tracking and management.
              </Text>
            </View>

            <View className="flex gap-4 p-6 items-center">
              <Text className="text-center text-lg text-[#101828] font-medium">
                No Orders Yet
              </Text>
              <Text className="text-center w-[70%] text-[#6A7282]">
                You haven't placed any orders yet.
              </Text>
              <Text className="text-center w-[90%] text-[#6A7282]">
                Start browsing our product catalog to place your first order.
              </Text>
            </View>

            <View className="flex gap-4 p-6 items-center">
              <Text className="text-center text-lg text-[#101828] font-medium">
                No Child Orders Yet
              </Text>
              <Text className="text-center w-[70%] text-[#6A7282]">
                This parent order doesn't have any child orders at the moment.
              </Text>
            </View>

            <View className="flex gap-4 p-6 items-center">
              <Text className="text-center text-lg text-[#101828] font-medium">
                No Items Added Yet
              </Text>
              <Text className="text-center w-[70%] text-[#6A7282]">
                This child order doesn't have any items at the moment.
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
        
        <View className='fixed px-8 bottom-2'>
          <TouchableOpacity className={selectedProducts.length>0?'bg-[#80062e] py-4 rounded-xl flex flex-row justify-center gap-2 align-middle items-center':'bg-[#975c70] py-4 rounded-xl flex flex-row justify-center gap-2 align-middle items-center'} disabled={selectedProducts.length > 0 ? false : true } ><SettingsWhite /><Text className='text-white text-center'>Request Service</Text></TouchableOpacity>
        </View>
  
        {RequestServiceVisible &&
        <View className='absolute inset-0 justify-center items-center bg-black/20 z-50'>
          <RequestService setRequestServiceVisible={setRequestServiceVisible} />
        </View>
          }
        </>
  );
}
