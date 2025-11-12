import React, { useEffect } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CameraBlack from '../../assets/cameraBlack.svg';
import QRCodeScanner from '../QRCodeScanner';
import { usePermissions, EPermissionTypes } from '../../context/usePermissions';
import { RESULTS, openSettings } from 'react-native-permissions'; // ← needed for permissions and goToSettings

interface RequestServiceProps {
  setRequestServiceVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RequestService = ({ setRequestServiceVisible }: RequestServiceProps) => {
  const [showScanner, setShowScanner] = React.useState(false);
  const [scannedData, setScannedData] = React.useState<any>();
  const [formData, setFormData] = React.useState({
    make: '',
    model: '',
    serialNumber: '',
  });
  const { askPermissions } = usePermissions(EPermissionTypes.CAMERA);

  useEffect(() => {
    console.log('RequestService component mounted');
  }, []);

  const goToSettings = () => openSettings();

  const takePermissions = async () => {
    askPermissions()
      .then(response => {
        if (
          response.type === RESULTS.LIMITED ||
          response.type === RESULTS.GRANTED
        ) {
          setShowScanner(true);
        }
      })
      .catch(error => {
        if ('isError' in error && error.isError) {
          Alert.alert(
            error.errorMessage ||
              'Something went wrong while taking camera permission',
          );
        }
        if ('type' in error) {
          if (error.type === RESULTS.UNAVAILABLE) {
            Alert.alert('This feature is not supported on this device');
          } else if (
            error.type === RESULTS.BLOCKED ||
            error.type === RESULTS.DENIED
          ) {
            Alert.alert(
              'Permission Denied',
              'Please give permission from settings to continue using camera.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                { text: 'Go To Settings', onPress: () => goToSettings() },
              ],
            );
          }
        }
      });
  };

const handleScan = (data: string) => {
    const parsedData = JSON.parse(data);
//   setScannedData(parsedData);
setFormData({
    make: parsedData.make || '',
    model: parsedData.model || '',
    serialNumber: parsedData.srno || ''
})
  setShowScanner(false);
  console.log('QR Code Data:', data);
};


  if (showScanner) {
    return <QRCodeScanner onScan={handleScan} onClose={() => setShowScanner(false)} />;
  }

  return (
    <View className="bg-white py-5 rounded-xl w-[80%] mx-auto">
      <View className="flex flex-row justify-between items-center align-middle border-b border-gray-400 px-6 pb-4">
        <Text className="text-black text-xl font-medium">Request Service</Text>
        <TouchableOpacity onPress={() => setRequestServiceVisible(false)} className="text-center align-middle items-center">
          <Text className="text-3xl">×</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={takePermissions} className="bg-gray-200 rounded-xl p-4 flex flex-row w-1/2 mx-auto mt-4 text-center items-center justify-center gap-2">
          <CameraBlack />
          <Text className="text-center">Scan QR Code</Text>
        </TouchableOpacity>
        {scannedData ? (
  <Text className="text-center text-green-700 mt-2">
    Scanned: {formData.make} {formData.model} {formData.serialNumber}
  </Text>
) : null}

        <View className="p-2">
          <Text className="pl-1">Make</Text>
          <TextInput className="bg-gray-100 rounded-xl mt-1 px-2 text-gray-700" placeholder="Enter Make" placeholderTextColor={'gray'} value={formData?.make} />
        </View>
        <View className="p-2">
          <Text className="pl-1">Model</Text>
          <TextInput className="bg-gray-100 rounded-xl mt-1 px-2 text-gray-700" placeholder="Enter Model" placeholderTextColor={'gray'} value={formData?.model} />
        </View>
        <View className="p-2">
          <Text className="pl-1">Serial Number</Text>
          <TextInput className="bg-gray-100 rounded-xl mt-1 px-2 text-gray-700" placeholder="Enter Serial Number" placeholderTextColor={'gray'} value={formData?.srno} />
        </View>
      </View>

      <View className="flex flex-row justify-center gap-3 mt-2">
        <TouchableOpacity onPress={() => setRequestServiceVisible(false)} className="p-2 border border-gray-300 rounded-xl">
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-2 bg-[#80062e] rounded-xl">
          <Text className="text-white">Submit Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
