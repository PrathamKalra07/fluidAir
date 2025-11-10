import React, { useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import CameraBlack from '../../assets/cameraBlack.svg'
import { QRCodeScanner } from '../QRCodeScanner';

interface RequestServiceProps {
  setRequestServiceVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


export const RequestService = ({setRequestServiceVisible}:RequestServiceProps) => {
    useEffect(()=>{
        console.log('RequestService component mounted');
    },[])

    const [showScanner,setShowScanner] = React.useState(false);
    const [scannedData,setScannedData] = React.useState<string>('');

    const handleScan = (data: string) => {
        setScannedData(data);
        setShowScanner(false);
        console.log('QR Code Data:', data);
    };

    if (showScanner) {
        return <QRCodeScanner onScan={handleScan} onClose={() => setShowScanner(false)} />;
    }
  return (
    <View className='bg-white py-5 rounded-xl w-[80%] mx-auto'>
    <View className=' flex flex-row justify-between items-center align-middle border-b border-gray-400 px-6 pb-4'>
        <Text className='text-black text-xl font-medium'>Request Service</Text>
        <TouchableOpacity onPress={()=>setRequestServiceVisible(false)} className='text-center align-middle items-center'><Text className='text-3xl'>×</Text></TouchableOpacity>
    </View>
    <View>
        <TouchableOpacity  onPress={() => setShowScanner(true)} className='bg-gray-200 rounded-lxl p-4 flex flex-row w-1/2 mx-auto mt-4 rounded-xl text-center items-center justify-center gap-2'>
            <CameraBlack />
            <Text className='text-center'>Scan QR Code</Text>
        </TouchableOpacity>
        <View className='p-2'>
            <Text className='pl-1'>Make</Text>
            <TextInput className='bg-gray-100 rounded-xl mt-1 px-2 text-gray-700' placeholder='Enter Make' placeholderTextColor={'gray'}></TextInput>
        </View>
        <View className='p-2'>
            <Text className='pl-1'>Model</Text>
            <TextInput className='bg-gray-100 rounded-xl mt-1 px-2 text-gray-700' placeholder='Enter Model' placeholderTextColor={'gray'}></TextInput>
        </View>
        <View className='p-2'>
            <Text className='pl-1'>Serial Number</Text>
            <TextInput className='bg-gray-100 rounded-xl mt-1 px-2 text-gray-700' placeholder='Enter Serial Number' placeholderTextColor={'gray'}></TextInput>
        </View>
    </View>
    <View className='flex flex-row justify-center gap-3 mt-2'>
        <TouchableOpacity onPress={()=>setRequestServiceVisible(false)} className='p-2 border border-gray-300 rounded-xl'>
            <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity className='p-2 bg-[#80062e] rounded-xl'>
            <Text className='text-white'>Submit Request</Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}
