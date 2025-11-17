import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CameraBlack from '../../assets/cameraBlack.svg';
import QRCodeScanner from '../QRCodeScanner';
import { usePermissions, EPermissionTypes } from '../../context/usePermissions';
import { RESULTS, openSettings } from 'react-native-permissions';

export const RequestService = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    srno: '', 
  });

  const { askPermissions } = usePermissions(EPermissionTypes.CAMERA);

  useEffect(() => {
    console.log('RequestService mounted');
  }, []);

  const goToSettings = () => openSettings();

  const takePermissions = async () => {
    try {
      const response = await askPermissions();

      if (response.type === RESULTS.LIMITED || response.type === RESULTS.GRANTED) {
        setShowScanner(true);
      } else if (response.type === RESULTS.BLOCKED || response.type === RESULTS.DENIED) {
        Alert.alert(
          'Permission Denied',
          'Please enable camera access from Settings to scan QR codes.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Go to Settings', onPress: goToSettings },
          ],
        );
      } else if (response.type === RESULTS.UNAVAILABLE) {
        Alert.alert('Camera not available on this device.');
      }
    } catch (error: any) {
      console.error('Permission error:', error);
      Alert.alert('Error', 'Something went wrong while requesting permission.');
    }
  };

const handleScan = (data: string) => {
  try {
    console.log('📥 Raw QR value:', data);

    let unwrapped = data.trim();

    if (unwrapped.startsWith('"') && unwrapped.endsWith('"')) {
      unwrapped = JSON.parse(unwrapped); 
    }

    let cleaned = unwrapped
      .replace(/\\n/g, '') 
      .replace(/\n/g, '')   
      .replace(/'/g, '"')   
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleaned.startsWith('{')) cleaned = `{${cleaned}}`;

    console.log('Cleaned QR string:', cleaned);

    const parsed = JSON.parse(cleaned);

    console.log('Final parsed QR:', parsed);

    setFormData({
      make: parsed.make ?? '',
      model: parsed.model ?? '',
      srno: parsed.srno ?? '',
    });

    setScannedData(parsed);
    setShowScanner(false);
  } catch (err) {
    console.warn('Invalid QR:', err);
    Alert.alert(
      'Invalid QR Code',
      'Scanned data could not be processed. Please ensure it contains valid JSON or key:value data.'
    );
    setShowScanner(false);
  }
};



  if (showScanner) {
    return (
      <QRCodeScanner
        onScan={handleScan}
        onClose={() => setShowScanner(false)}
      />
    );
  }

  return (
    <View className="bg-white py-5 rounded-xl w-[90%] mx-auto">
      {/* Header */}
      <View className="flex flex-row justify-center items-center border-b border-gray-300 px-6 pb-4">
        <Text className="text-black text-xl font-medium">Request Your Service</Text>
      </View>

      {/* QR Scan button */}
      <View>
        <TouchableOpacity
          onPress={takePermissions}
          className="bg-gray-200 rounded-xl p-4 flex flex-row w-1/2 mx-auto mt-4 items-center justify-center gap-2"
        >
          <CameraBlack />
          <Text className="text-center text-base">Scan QR Code</Text>
        </TouchableOpacity>

        {scannedData && (
          <Text className="text-center text-green-700 mt-2">
            ✅ Scanned
          </Text>
        )}

        {/* Make input */}
        <View className="p-2">
          <Text className="pl-1 text-gray-600">Make</Text>
          <TextInput
            className="bg-gray-100 rounded-xl mt-1 px-2 text-gray-700"
            placeholder="Enter Make"
            placeholderTextColor={'gray'}
            value={formData.make}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, make: text }))}
          />
        </View>

        {/* Model input */}
        <View className="p-2">
          <Text className="pl-1 text-gray-600">Model</Text>
          <TextInput
            className="bg-gray-100 rounded-xl mt-1 px-2 text-gray-700"
            placeholder="Enter Model"
            placeholderTextColor={'gray'}
            value={formData.model}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, model: text }))}
          />
        </View>

        {/* Serial Number input */}
        <View className="p-2">
          <Text className="pl-1 text-gray-600">Serial Number</Text>
          <TextInput
            className="bg-gray-100 rounded-xl mt-1 px-2 text-gray-700"
            placeholder="Enter Serial Number"
            placeholderTextColor={'gray'}
            value={formData.srno}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, srno: text }))
            }
          />
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex flex-row justify-center gap-3 mt-2">
        <TouchableOpacity
          className="p-2 border border-gray-300 rounded-xl px-4"
          onPress={() =>
            setFormData({
              make: '',
              model: '',
              srno: '',
            })
          }
        >
          <Text>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-2 bg-[#80062e] rounded-xl px-4"
          onPress={() => {
            console.log('Submitting form:', formData);
            Alert.alert('Submitted', 'Service request submitted successfully!');
          }}
        >
          <Text className="text-white font-medium">Submit Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
